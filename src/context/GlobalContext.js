import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer'

//inital state
const initialState = {
   notes: []
}


// create context

export const GlobalContext = createContext(initialState);

// global provider 

export function GlobalProvider({children}) {

    const [state, dispatch] = useReducer(AppReducer,initialState);

    //actions

    function deleteNote(id) {
        dispatch({
            type: 'DELETE_NOTE',
            payload: id
         } )
    }

    function addNote(note) {
        dispatch({
            type: 'ADD_NOTE',
            payload : note
        })
    }

    return(
        <GlobalContext.Provider value ={{
            notes : state.notes,
            deleteNote,
            addNote
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
