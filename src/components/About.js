import { useEffect } from 'react';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
export default function About(){
    const a=useContext(NoteContext);
    useEffect(()=>{
       a.updateState();
    });
    return(
        <> 
            <h1>About Page {a.state2.name}</h1>
        </>
    )
}