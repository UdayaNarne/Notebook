import React,{useContext,useRef,useEffect,useState} from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItems';
import { useNavigate } from 'react-router-dom';
import AddNotes from './AddNotes';
export default function Notes(props){
    let navigate=useNavigate();
    const context=useContext(NoteContext);
    const {notes,setNotes,fetchNotes,editNote,addNote}=context;
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});
    
    useEffect(()=>{
        if(localStorage.getItem('token')){
            fetchNotes();
        }
        else{
            navigate("/login");
        }
    },[]);
    const ref=useRef(null);
    const refClose=useRef(null);
    
    
    const updateNote=async (note)=>{        //Working
        console.log("Updating note with id12"+note._id);
        ref.current.click();
        setNote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag});
        //props.showAlert("Note updated successfully","success");
    }
    const handleClick=async(e)=>{
        refClose.current.click();
        await editNote({id:note.id,title:note.etitle,description:note.edescription,tag:note.etag});
        props.showAlert("Note updated successfully","success");
        
        console.log("Updated successfully:",note.id);
    }
    
    const onChange=async (e)=>{
        console.log("Updating note with id78:"+note.id);
        setNote({...note,[e.target.name]:e.target.value});
        console.log(note);
    }
    return (
        <>
            <AddNotes showAlert={props.showAlert}/>
            <div className="row mx-3 my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                {notes.length===0 && "No notes to display"}
                </div>
                {notes.map((note)=>{
                    return (
                        <NoteItem note={note}  updateNote={()=>updateNote(note)} id={note._id} showAlert={props.showAlert} key={note.title+note._id}/>
                    )
                })}
            </div>
            <button type="button" className="btn btn-primary d-none"  ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Update Note
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" minLength={5} required value={note.etitle} name="etitle" onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" minLength={5} required value={note.edescription} name="edescription" onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" minLength={3} required value={note.etag} onChange={onChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button ref={refClose} disabled={note.etitle.length<5 || note.edescription.length <5} type="button" className="btn btn-primary" onClick={async ()=>await handleClick()}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}