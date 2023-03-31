import SignIn from "@/components/auth/buttons/SignIn";
import SignOut from "@/components/auth/buttons/SignOut";
import AddNote from "@/components/notes/AddNote";
import NoteList from "@/components/notes/NoteList";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className='fixed top-0 left-0 w-full flex justify-between py-1'>
        <div>Home</div>
        <div className='flex items-center'>
          <div>{session ? <SignOut /> : <SignIn />}</div>
          {session && (
            <div className='ml-1'>
              <Image
                src={session?.user.image!}
                alt='profile'
                height={35}
                width={35}
                className='rounded-full'
              />
            </div>
          )}
        </div>
      </div>
      <div className='mt-16'>
        <AddNote />
      </div>
      <div>{session && <NoteList />}</div>
    </div>
  );
}
