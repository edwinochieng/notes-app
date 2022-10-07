import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addNote } = useContext(GlobalContext);

  function handleSubmit(e) {
    e.preventDefault();

    const newNote = {
      id: Math.floor(Math.random() * 10000000),
      title,
      content,
    };
    addNote(newNote);
  }

  return (
    <div className="relative bg-neutral-50 border border-solid border-zinc-100 border-2 rounded-xl mt-4 w-128 h-50 pt-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-start pl-7">
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2 px-2 w-116 border border-solid rounded-lg focus: outline-none"
          type="text"
          value={title}
          placeholder="Title"
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          className="px-2 py-1 h-28 w-116 resize-none border border-solid rounded-lg focus: outline-none "
          type="text"
          value={content}
          rows="20"
          cols="70"
          placeholder="Enter Note..."
        />
        <button
          type="submit"
          className="absolute bottom-1 right-8 border border-solid rounded-xl w-16 h-6 bg-gray-700 text-white text-sm font-quicksand"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
