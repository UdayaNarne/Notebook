import React,{useContext} from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItems';
export default function Notes(){
    const context=useContext(NoteContext);
    const {note,setNote}=context;
    return (
        <>
            <div className="row mx-3 my-3">
            <h2>Your Notes</h2>
            {note.map((a)=>{
                return (
                    <NoteItem note={a}/>)
                })}
            </div>
        </>
    )
}