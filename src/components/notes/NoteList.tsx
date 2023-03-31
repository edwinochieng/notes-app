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
    <div>
      {data?.map((note: any) => (
        <Note key={data?.id} note={note} />
      ))}
    </div>
  );
}
