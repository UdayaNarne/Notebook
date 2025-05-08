import {useState,useEffect} from 'react';
import NoteContext from './NoteContext'

const NoteState=(props)=>{
    const host="http://localhost:8000";
    const[notes,setNotes]=useState([]);
    const fetchNotes=async()=>{
      const URL=host+"/api/notes/getNotes";
      const response=await fetch(URL,{
        method:'GET',
        mode:'cors',
        cache:'no-cache',
        credentials:'same-origin',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        redirect:'follow',
        referrerPolicy:'no-referrer'
      })
      const result=await response.json();
      setNotes(result);
    }
    
    const addNote= async({title,description,tag})=>{
      //Fetching all the notes
      const URL=host+"/api/notes/createNote";
      const response=await fetch(URL,{
        method:'POST',
        mode:'cors',
        cache:'no-cache',
        credentials:'same-origin',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        redirect:'follow',
        referrerPolicy:'no-referrer',
        body:JSON.stringify({title,description,tag}),
      });
      const result=await response.json();
      setNotes(prevNotes => [...prevNotes, {title:result.title,description:result.description,tag:result.tag}]);
    }
    // Deleting the note
    async function deleteNote(id){
      const URL=host+"/api/notes/deleteNote/"+id;
      const response=await fetch(URL,{
        method:'DELETE',
        mode:'cors',
        cache:'no-cache',
        credentials:'same-origin',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        redirect:'follow',
        referrerPolicy:'no-referrer',
      })
      const result=await response.json();
      console.log("Res:",result);
      const newNotes=notes.filter((note)=>{
        return note._id!==result.note._id;
      });
      setNotes(newNotes);
    }

    // Editing the note 
    const editNote=async({id,title,description,tag})=>{  
      const URL=host+"/api/notes/updateNote/"+id;
      const response =await fetch(URL, {
        method:'PUT',
        mode:'cors',
        cache:'no-cache',
        credentials:'same-origin',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        redirect:'follow',
        referrerPolicy:'no-referrer',
        body:JSON.stringify({title,description,tag}),
      });
      const result= await response.json(); // Response is a promise and thus without await it returns undefined
      console.log("Res:",result);
      const newNotes=notes.map((note)=>{
        if(note._id===id){
          return{
            ...note,
            title:result.title,
            description:result.description,
            tag:result.tag
          }
        }
        else{
          return note;
        }
      })
      setNotes(newNotes);
    }
    return(
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;