import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function NoteContent({ note }) {
  const { deleteNote } = useContext(GlobalContext);
  return (
    <div className="relative border border-solid mx-2 my-1 px-3 py-2 h-auto w-82 border border-solid border-2 border-zinc-100 rounded-lg bg-neutral-50">
      <div>
        <h1 className="font-quicksand pb-1">{note.title}</h1>
        <p className="font-urbanist">{note.content}</p>
      </div>
      <div className="absolute bottom-1 right-1">
        <button onClick={() => deleteNote(note.id)}>
          <DeleteForeverIcon color="action" sx={{ fontSize: 17 }} />
        </button>
      </div>
    </div>
  );
}

export default NoteContent;
