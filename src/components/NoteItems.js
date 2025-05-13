import React,{useContext} from 'react';
import NoteContext from '../context/notes/NoteContext';
export default function NoteItem(props){
    const context=useContext(NoteContext);
    const {deleteNote}=context;
    const {updateNote}=props;
    //const [color,setColor]=useState("black")
    let color="",text="white";
    if(props.note.tag==="Important"){
        color="red";
    }
    else if(props.note.tag==="Normal"){  
        color="blue";
    }
    else if(props.note.tag==="Personal"){
        color="#FFB22C";
        text="black";
    }
    else if(props.note.tag==="Work"){
        color="green";
    }
    else if(props.note.tag==="Other"){
        color="purple";
    }
    else{
        color="black";
    }
    return (
    <>
       <div className="card mx-3 my-3 p-0 border-3" style={{width: "18rem",height:"300px",borderColor:"#FFB8E0" ,borderRadius:"10px",boxShadow:"0 0 10px #FFB8E0"}}>    
            <div className="card-header h-50 text-black d-flex justify-content-between align-items-center" style={{backgroundColor:'#FFF085',borderColor:"#FFB8E0"}}>
                <h1>{props.note.title}</h1>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(props.note)}}></i>
                <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(props.note._id);props.showAlert("Note deleted successfully","success");}}></i>
            </div>
            <div className="card-body d-flex justify-content-between align-items-center">
                <p className="card-text">{props.note.description}</p>
                <span className="badge" style={{backgroundColor:color,color:text}}>{props.note.tag}</span>
            </div>
        </div>
    </>
        // <div className="container col-md-3">
        //     <div className="card my-3 mx-3" style={{width: "18rem"}}>
        //         <div className="card-body">
        //             <div className="d-flex justify-content-between align-items-center">
        //                 <h5 className="card-title">{props.note.title}</h5>
        //                 <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(props.note)
        //                 }}></i>
        //                 <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(props.note._id)
        //                     props.showAlert("Note deleted successfully","success");
        //                 }}></i>
        //             </div>
        //             <p className="card-text">{props.note.description}</p>
        //         </div>
        //     </div>
        // </div>
    )
}