import {useState} from 'react';
import NoteContext from './NoteContext'

const NoteState=(props)=>{
    const host="http://localhost:8000";
    const notes2=[
        {
          "_id": "6818caf9bf08dea242e0e06b",
          "user": "6818c99993091c5db32491c2",
          "title": "Projects based on OOPS",
          "description": "Do more u understand more",
          "tag": "Work",
          "date": "2025-05-05T14:28:09.857Z",
          "__v": 0
        },
        {
          "_id": "6818cb11bf08dea242e0e06d",
          "user": "6818c99993091c5db32491c2",
          "title": "Work",
          "description": "My work my wish",
          "tag": "Personal",
          "date": "2025-05-05T14:28:33.027Z",
          "__v": 0
        }
      ]
      const[notes,setNotes]=useState(notes2);
      //Adding a new note
      const addNote= async({title,description,tag})=>{
        const URL=host+"api/notes/addNote";
        // const note={
        //   "_id": "6816b95d7ce19095239f1388",
        //   "user": "6814591401ee19ebac3bb18a",
        //   "title": title,
        //   "description": description,
        //   "tag": tag,
        //   "date": "2025-05-04T00:48:29.433Z",
        //   "__v": 0
        // }
        const response=await fetch(URL,{
          method:'POST',
          mode:'cors',
          cache:'no-cache',
          credentials:'same-origin',
          headers:{
            'Content-Type':'application/json',
            },
          redirect:'follow',
          referrerPolicy:'no-referrer',
          body:JSON.stringify({title,description,tag}),
        });
        //setNotes(notes.concat(note));
      }
      function deleteNote(id){
        console.log("Note is deleted:"+id);
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }
      const editNote=async({id,title,description,tag})=>{  
        const URL=host+"/api/notes/updateNote/"+id;
        const response =await fetch(URL, {
          method:'PUT',
          mode:'cors',
          cache:'no-cache',
          credentials:'same-origin',
          headers:{
            'Content-Type':'application/json',
          },
          redirect:'follow',
          referrerPolicy:'no-referrer',
          body:JSON.stringify({title,description,tag}),
        });
        const result= await response.json(); // Response is a promise and thus without await it returns undefined

        const newNotes=notes.map((note)=>{
          if(note._id===id){
            return{
              ...note,
              title:title,
              description:description,
              tag:tag
            }
          }
          else{
            return note;
          }
        })
        setNotes(newNotes);
      }
    return(
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;