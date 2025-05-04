import {useState} from 'react';
import NoteContext from './NoteContext'

const NoteState=(props)=>{
    const notes=[
        {
          "_id": "6816b95d7ce19095239f1387",
          "user": "6814591401ee19ebac3bb08a",
          "title": "Note of Projects that are pending",
          "description": "This note contains all the projects that are pending of mine",
          "tag": "Work",
          "date": "2025-05-04T00:48:29.433Z",
          "__v": 0
        },
        {
          "_id": "6816b9cd7ce19095239f1389",
          "user": "6814591401ee19ebac3bb08a",
          "title": "Daily tasks that are to be done",
          "description": "This includes daily tasks that are to be done like Yoga, Exercise to make oneself healthy",
          "tag": "Personal",
          "date": "2025-05-04T00:50:21.558Z",
          "__v": 0
        }
      ]
      const[note,setNote]=useState(notes);
    return(
        <NoteContext.Provider value={{note,setNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;