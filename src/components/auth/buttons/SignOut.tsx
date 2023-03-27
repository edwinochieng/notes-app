"use client";

import React from "react";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div
      onClick={() => signOut({ callbackUrl: "/signin" })}
      className='bg-gray-800 py-1 px-3 text-gray-200 rounded font-semibold text-sm cursor-pointer'
    >
      Sign Out
    </div>
  );
}
