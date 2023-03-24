import SignInOptions from "@/components/auth/SignInOptions";
import React from "react";

export default function SignInPage() {
  return (
    <div className='h-screen flex flex-col justify-center'>
      <div className='mb-56'>
        <SignInOptions />
      </div>
    </div>
  );
}
