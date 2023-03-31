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
    <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
      <label htmlFor='title' className='font-medium'>
        Title
      </label>
      <input
        type='text'
        name='title'
        id='title'
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className='border border-gray-400 rounded-md p-2'
      />

      <label htmlFor='content' className='font-medium'>
        Content
      </label>
      <textarea
        name='content'
        id='content'
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
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
