import Nav from "@/components/navbar/Nav";
import AddNote from "@/components/notes/AddNote";
import Note from "@/components/notes/Note";
import React from "react";

const fetchNotes = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/notes/getNotes`);

  if (!res.ok) {
    throw new Error("Data not fetched");
  }

  return res.json();
};
export default async function Home() {
  const notes = await fetchNotes();
  console.log(notes);

  return (
    <div>
      <Nav />
      <div className='mt-16'>
        <AddNote />
      </div>
      <div></div>
    </div>
  );
}
