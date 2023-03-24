"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export default function SignInOptions() {
  return (
    <div className='max-w-[250px] mx-auto flex flex-col items-center space-y-2 text-sm'>
      <button
        className='w-full bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded-md flex items-center justify-center'
        onClick={() => signIn("google")}
      >
        <FcGoogle className='inline-block mr-2' size={18} />
        Sign in with Google
      </button>
      <button
        className='w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center'
        onClick={() => signIn("github")}
      >
        <BsGithub className='inline-block mr-2' size={18} />
        Sign in with GitHub
      </button>
    </div>
  );
}
