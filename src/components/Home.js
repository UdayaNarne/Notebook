import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Notes from './Notes';
import AddNotes from './AddNotes';
export default function Home(props){
    return(
        <>
        <Notes showAlert={props.showAlert}/>
        </>
    )
}