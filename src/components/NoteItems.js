import React,{useContext} from 'react';
import NoteContext from '../context/notes/NoteContext';
export default function NoteItem(props){
    const context=useContext(NoteContext);
    const {deleteNote,editNote}=context;
    const {note}=props;
    return (
        <div className="container col-md-3">
            <div className="card my-3 mx-3" style={{width: "18rem"}}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>editNote(
                            {id:note._id,title:"Hii",description:"HelloWorld",tag:"Personal"}
                            )}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>deleteNote(note._id)}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
        
    )
}