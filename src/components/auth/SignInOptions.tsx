"use client";

import React from "react";
import { signIn, useSession } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function SignInOptions() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  if (session) {
    setTimeout(() => {
      router.push("/");
    }, 3000);
    return <div className='text-gray-800'>You are already signed in</div>;
  }
  return (
    <div className='max-w-[250px] mx-auto flex flex-col items-center space-y-2 text-sm'>
      <button
        className='w-full bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded-md flex items-center justify-center'
        onClick={() => handleSignIn("google")}
      >
        <FcGoogle className='inline-block mr-2' size={18} />
        Sign in with Google
      </button>
      <button
        className='w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center'
        onClick={() => handleSignIn("github")}
      >
        <BsGithub className='inline-block mr-2' size={18} />
        Sign in with GitHub
      </button>
    </div>
  );
}
