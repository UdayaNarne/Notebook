import React,{useContext,useState} from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function AddNote(){
    const context=useContext(NoteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note);
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    return(
        <>
            <div className="container my-3">
            <h2>Add Note</h2>
            <form>
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <button type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
            </form>
        </div>
        </>
    )
}