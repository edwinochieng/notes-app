"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string(),
  content: z.string().min(1).max(400),
});

type Note = z.infer<typeof formSchema>;

export default function AddNote() {
  const [note, setNote] = useState<Note>({ title: "", content: "" });
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (note: Note) => await axios.post("/api/notes/newNote", { note }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      },
      onSuccess: (data) => {
        toast.success("Note saved");
        queryClient.invalidateQueries(["notes"]);
        setNote({ title: "", content: "" });
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(note);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col space-y-4 rounded-md bg-white shadow-xl p-4 max-w-[800px] w-full mx-auto'
    >
      <input
        type='text'
        name='title'
        id='title'
        placeholder='Title'
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className=' rounded-md p-2 border border-gray-100 outline-none '
      />

      <textarea
        name='content'
        id='content'
        placeholder='Take a note...'
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        className=' rounded-md p-2 h-auto border border-gray-100 outline-none'
      ></textarea>

      <div className='flex justify-end'>
        <button
          type='submit'
          className=' bg-gray-700 text-white py-1 px-5 rounded-md hover:bg-gray-800'
        >
          Save
        </button>
      </div>
    </form>
  );
}
