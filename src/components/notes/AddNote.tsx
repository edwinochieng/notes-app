"use client";

import React, { useState } from "react";

type Note = {
  title: string;
  content: string;
};

export default function AddNote() {
  const [note, setNote] = useState<Note>({ title: "", content: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle submitting the note to a database or API
    console.log(note);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };
  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
      <label htmlFor='title' className='font-medium'>
        Title
      </label>
      <input
        type='text'
        name='title'
        id='title'
        value={note.title}
        onChange={handleChange}
        className='border border-gray-400 rounded-md p-2'
      />

      <label htmlFor='content' className='font-medium'>
        Content
      </label>
      <textarea
        name='content'
        id='content'
        value={note.content}
        onChange={handleChange}
        className='border border-gray-400 rounded-md p-2 h-32'
      ></textarea>

      <button
        type='submit'
        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
      >
        Save
      </button>
    </form>
  );
}
