import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Notes from './Notes';
import AddNotes from './AddNotes';
export default function Home(){
    const context=useContext(NoteContext);
    const {note,setNote}=context;
    console.log("Note",note);
    return(
        <>
        {/* <AddNotes/> */}
        <Notes/>
        </>
    )
}