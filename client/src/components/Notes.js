import React, { useContext, useEffect} from "react";
import NoteContent from "./NoteContent";
import { GlobalContext } from "../context/GlobalContext";

function Notes() {
  const { notes, getNotes} = useContext(GlobalContext);

  useEffect(()=>{
    getNotes();
  },[])

  return (
    <div className="grid grid-cols-4 gap-3 mx-24 mt-3 ease-in duration-200">
      {notes.map((note) => (
        <NoteContent key={note.id} note={note} />
      ))}
    </div>
  );
}

export default Notes;
