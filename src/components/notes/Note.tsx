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
    <div className=' bg-white shadow-lg rounded-md p-2 w-full'>
      <h2 className='font-medium text-[16px]'>{note.title}</h2>
      <p className='text-[15px] text-gray-600 mt-[1px] break-words'>
        {note.content}
      </p>
      <div className='mt-2 flex items-center justify-end'>
        <div className='mr-1'>
          <EditNote note={note} />
        </div>
        <div>
          <DeleteNote id={note.id} />
        </div>
      </div>
    </div>
  );
}
