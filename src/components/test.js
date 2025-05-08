import React,{useContext,useRef} from 'react';
import NoteContext from '../context/notes/NoteContext';
export default function Tests(props){
    const context=useContext(NoteContext);
    const {deleteNote}=context;
    const {note}=props;
    const ref=useRef(null);
    const updateNotes=(note)=>{
        ref.current.click();
    }
    return (
        <>
        <div className="container col-md-3">
            <div className="card my-3 mx-3" style={{width: "18rem"}}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>updateNotes(note)}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>deleteNote(note._id)}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>

<button type="button" class="btn btn-primary"  data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
Update Note
</button>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    ...
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
    </div>
    </div>
</div>
</div>
</> 
    )
}