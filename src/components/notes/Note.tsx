"use client";
import React from "react";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";

type Note = {
  id: string;
  title: string;
  content: string;
};

interface Props {
  note: Note;
}

export default function Note({ note }: Props) {
  return (
    <div className='bg-white border border-gray-400 rounded-md p-4'>
      <h2 className='font-medium text-lg'>{note.title}</h2>
      <p className='text-gray-600 mt-2'>{note.content}</p>
      <div className='flex'>
        <div>
          <EditNote note={note} />
        </div>
        <div>
          <DeleteNote id={note.id} />
        </div>
      </div>
    </div>
  );
}
