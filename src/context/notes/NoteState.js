import {useState} from 'react';
import NoteContext from './NoteContext'

const NoteState=(props)=>{
    const notes2=[
        {
          "_id": "6816b95d7ce19095239f1387",
          "user": "6814591401ee19ebac3bb08a",
          "title": "Note of Projects that are pending",
          "description": "This note contains all the projects that are pending of mine",
          "tag": "Work",
          "date": "2025-05-04T00:48:29.433Z",
          "__v": 0
        },
        {
          "_id": "6816b9cd7ce19095239f1389",
          "user": "6814591401ee19ebac3bb08a",
          "title": "Daily tasks that are to be done",
          "description": "This includes daily tasks that are to be done like Yoga, Exercise to make oneself healthy",
          "tag": "Personal",
          "date": "2025-05-04T00:50:21.558Z",
          "__v": 0
        }
      ]
      const[notes,setNotes]=useState(notes2);
      //Adding a new note
      function addNote({title,description,tag}){
        const note={
          "_id": "6816b95d7ce19095239f1388",
          "user": "6814591401ee19ebac3bb18a",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2025-05-04T00:48:29.433Z",
          "__v": 0
        }
        setNotes(notes.concat(note));
      }
      function deleteNote(id){
        console.log("Note is deleted:"+id);
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }
      function editNote({id,title,description,tag}){
        // const note=notes.find((note)=>{return note._id===id});
        // if(note){
        //   note.title=title;
        //   note.description=description;
        //   note.tag=tag;
        // }
        // const newNotes=notes.filter((note)=>{return note._id!==id});
        // newNotes.push(note);
        // setNotes(newNotes);
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