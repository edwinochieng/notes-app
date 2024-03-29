"use client";

import Image from "next/image";
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className='bg-gray-100'>
      <div className='flex justify-center items-center'>
        <Image
          height={22}
          width={22}
          src='https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif'
          alt='loading'
        />
      </div>
    </div>
  );
}
