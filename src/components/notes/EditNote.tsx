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

type Note = {
  id: string;
  title: string;
  content: string;
};

interface Props {
  note: Note;
}

type NewNote = {
  title: string;
  content: string;
};

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
          toast.error("Error editing note");
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["notes"]);
        toast.success("Note has been edited");
      },
    }
  );

  const handleEdit = () => {
    mutate(newNote);
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Edit Note
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <label htmlFor='title' className='font-medium'>
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className='border border-gray-400 rounded-md p-2'
          />
          <label htmlFor='content' className='font-medium'>
            Content
          </label>
          <textarea
            name='content'
            id='content'
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
            className='border border-gray-400 rounded-md p-2 h-32'
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
