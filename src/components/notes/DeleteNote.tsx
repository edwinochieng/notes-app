"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function DeleteNote({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete(`/api/notes/${id}/deleteNote`, { data: id }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error("Error deleting note");
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["notes"]);
        toast.success("Note has been deleted");
      },
    }
  );

  const handleDelete = () => {
    mutate(id);
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        className='text-xs bg-gray-50 hover:bg-gray-100 text-red-400 '
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Delete Note"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className='text-xs text-gray-600 bg-gray-50 hover:bg-gray-200 hover:text-gray-700'
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            className='text-xs text-gray-600 bg-gray-50 hover:bg-gray-200 hover:text-red-400'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
