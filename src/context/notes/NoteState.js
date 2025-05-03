import {useState} from 'react';
import NoteContext from './NoteContext'

const NoteState=(props)=>{
    // const state={
    //     "name":"Ravi",
    //     "class":"5th",
    //     "school":"St. Marys"
    // };
    const [state2,setState]=useState({
        "name":"Ravi",
        "class":"5th",
        "school":"St. Marys"
    });
    const updateState=()=>{
        setTimeout(()=>{
            setState({
                // ...state2,
                "name":"Udaya",
                "class":"10th",
                "school":"St. Marys"
            })
        },1000);
    }
    return(
        <NoteContext.Provider value={{state2,updateState}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;