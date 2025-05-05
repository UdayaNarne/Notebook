import React,{useContext} from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItems';
import AddNotes from './AddNotes';
export default function Notes(){
    const context=useContext(NoteContext);
    const {notes,setNotes,addNote}=context;
    return (
        <>
            <AddNotes/>
            <div className="row mx-3 my-3">
            <h2>Your Notes</h2>
            {notes.map((note,index)=>{
                return (
                    <NoteItem note={note} key={index+note.title}/>)
                })}
            </div>
        </>
    )
}