import React,{useContext,useState} from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function AddNote(props){
    const context=useContext(NoteContext);
    const {addNote}=context;
    const [note,setNote]=useState({id:"",title:"",description:"",tag:""});
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note);
        props.showAlert("Note added successfully","success");
        setNote({id:"",title:"",description:"",tag:""});
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
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} minLength={5} required name="title" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} minLength={5} required name="description" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} minLength={3} required onChange={onChange}/>
                </div>
                <button disabled={note.title.length < 5 || note.title.description <5 } type="submit" id="button" onClick={(e)=>handleClick(e)} className="btn btn-primary">Add Note</button>
            </form>
        </div>
        </>
    )
}