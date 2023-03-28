"use client";

import React from "react";
import { useSession } from "next-auth/react";
import SignOut from "../auth/buttons/SignOut";
import SignIn from "../auth/buttons/SignIn";
import Image from "next/image";

export default function Nav() {
  const { data: session } = useSession();

  return (
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
  );
}
