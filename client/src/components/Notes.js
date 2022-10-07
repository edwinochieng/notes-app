import React, { useContext } from "react";
import NoteContent from "./NoteContent";
import { GlobalContext } from "../context/GlobalContext";

function Notes() {
  const { notes } = useContext(GlobalContext);

  return (
    <div className="grid grid-cols-4 gap-3 mx-24 mt-3">
      {notes.map((note) => (
        <NoteContent key={note.id} note={note} />
      ))}
    </div>
  );
}

export default Notes;
