"use client";

import React from "react";
import { useSession } from "next-auth/react";
import SignOut from "../auth/buttons/SignOut";
import SignIn from "../auth/buttons/SignIn";

export default function Nav() {
  const { data: session } = useSession();

  return (
    <div className='fixed top-0 left-0 w-full flex justify-between'>
      <div>Home</div>
      <div>{session ? <SignOut /> : <SignIn />}</div>
    </div>
  );
}
