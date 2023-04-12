"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(60, { message: "Title should not exceed 60 characters" }),
  content: z
    .string()
    .min(1, { message: "Content is required" })
    .max(350, { message: "Content should not exceed 350 characters" }),
});
type Note = z.infer<typeof formSchema>;

interface NoteFormErrors {
  title?: string;
  content?: string;
}

export default function AddNote() {
  const [note, setNote] = useState<Note>({ title: "", content: "" });
  const [errors, setErrors] = useState<NoteFormErrors>({});

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await formSchema.parse(note);
      mutate(note);
      setErrors({});
    } catch (error: any) {
      const errorMessage = error.errors[0]?.message;
      setErrors({ [error.errors[0]?.path[0]]: errorMessage });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col space-y-4 rounded-md bg-white shadow-xl p-3 sm:p-4 max-w-[800px] w-full mx-auto'
    >
      <input
        type='text'
        name='title'
        id='title'
        placeholder='Title'
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className=' text-sm rounded-md py-1 px-2 border border-gray-100 outline-none '
      />
      {errors.title && (
        <span className='text-red-500 text-xs'>{errors.title}</span>
      )}

      <textarea
        name='content'
        id='content'
        placeholder='Take a note...'
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        className=' text-sm rounded-md py-1 px-2 h-24 border border-gray-100 outline-none'
      ></textarea>
      {errors.content && (
        <span className='text-red-500 text-xs'>{errors.content}</span>
      )}
      <div className='flex justify-between'>
        <div className='text-sm font-semibold text-gray-700'>
          {note.content.length}/350
        </div>
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
