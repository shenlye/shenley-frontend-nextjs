"use client";

import Image from "next/image";
export default function Avatar({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="Cool Avatar"
      className="rounded-full object-cover"
      width={200}
      height={200}
    />
  );
}
