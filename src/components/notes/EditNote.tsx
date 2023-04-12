"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { z } from "zod";

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

type Note = {
  id: string;
  title: string;
  content: string;
};

interface Props {
  note: Note;
}

type NewNote = z.infer<typeof formSchema>;

export default function EditNote({ note }: Props) {
  const [open, setOpen] = React.useState(false);
  const [newNote, setNewNote] = React.useState<NewNote>({
    title: note.title,
    content: note.content,
  });

  const queryClient = useQueryClient();

  let noteId: string = note.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewNote({
      title: note.title,
      content: note.content,
    });
  };

  const { mutate } = useMutation(
    async (newNote: NewNote) =>
      await axios.put(`/api/notes/${noteId}/editNote`, { data: newNote }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.errors[0].message);
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["notes"]);
        toast.success("Note has been edited");
        setOpen(false);
      },
    }
  );

  const handleEdit = async () => {
    try {
      await formSchema.parse(note);
      mutate(newNote);
    } catch (error: any) {
      setOpen(true);
    }
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        className='text-xs bg-gray-50 hover:bg-gray-100 text-blue-400 hover:text-blue-600'
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <div className='flex flex-col'>
            <label htmlFor='title' className='font-medium text-sm pb-1'>
              Title
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Title'
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
              className='text-sm rounded-md py-1 px-2 border border-gray-100 outline-none  '
            />

            <label htmlFor='content' className='font-medium py-1 text-sm'>
              Content
            </label>
            <textarea
              name='content'
              id='content'
              placeholder='Note..'
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              className=' text-sm rounded-md py-1 px-2 h-28 border border-gray-100  outline-none '
            ></textarea>
          </div>
          <div className='text-xs font-semibold text-gray-700 pt-1'>
            {newNote.content.length}/350
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className='text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-red-400'
          >
            Cancel
          </Button>
          <Button
            onClick={handleEdit}
            className='text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-green-500'
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
