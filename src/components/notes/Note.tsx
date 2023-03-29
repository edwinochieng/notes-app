"use client";
import React from "react";

type Note = {
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
    </div>
  );
}
