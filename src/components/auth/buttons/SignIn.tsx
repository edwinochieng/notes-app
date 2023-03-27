"use client";

import React from "react";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className='bg-gray-800 py-1 px-3 text-gray-200 rounded font-semibold text-sm'>
      <Link href='/signin'>Sign In</Link>
    </div>
  );
}
