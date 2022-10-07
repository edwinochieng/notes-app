import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import Axios from "axios"

//inital state
const initialState = {
  notes: [],
  error:null,
  loading:true
};

// create context

export const GlobalContext = createContext(initialState);

// global provider

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions
  async function getNotes() {
    try {
      const res = await Axios.get('/api/v1/notes')
      dispatch({
        type: "GET_NOTES",
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: "FETCH_ERROR",
        payload:err.response.data.error
      })
    }
  }
  async function deleteNote(id) {
    try {
      await Axios.delete(`/api/v1/notes/${id}`)
      dispatch({
        type: "DELETE_NOTE",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "FETCH_ERROR",
        payload:err.response.data.error
      })
    }
    
  }

  async function addNote(note) {
    try {
      const config = {
        headers : {
          'Content-Type': 'application/json'
        }
      }
      const res = await Axios.post('/api/v1/notes',note,config)
      dispatch({
        type: "ADD_NOTE",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "FETCH_ERROR",
        payload:err.response.data.error
      })
    }
    
  }

  return (
    <GlobalContext.Provider
      value={{
        notes: state.notes,
        loading:state.loading,
        error:state.loading,
        getNotes,
        deleteNote,
        addNote,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
