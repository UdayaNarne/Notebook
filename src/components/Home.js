import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
export default function Home(){
    const {state,state2}=useContext(NoteContext);
    return(
        <>
        <h1>Welcome to home page {state.class}</h1>
        </>
    )
}