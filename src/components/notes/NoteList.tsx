"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Note from "./Note";
import LoadingSpinner from "../Spinner";

const fetchNotes = async () => {
  const res = await axios.get("/api/notes/getNotes");

  return res.data;
};

export default function NoteList() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchNotes,
    queryKey: ["notes"],
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>An error occurred: {(error as Error).message}</p>;
  }

  return (
    <div className='mb-8 grid place-items-center items-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
      {data?.map((note: any) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
}
