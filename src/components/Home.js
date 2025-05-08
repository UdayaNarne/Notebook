import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Notes from './Notes';
import AddNotes from './AddNotes';
export default function Home(props){
    //const context=useContext(NoteContext);
    //const {note,setNote}=context;
    //console.log("Note",note);
    return(
        <>
        <Notes showAlert={props.showAlert}/>
        </>
    )
}