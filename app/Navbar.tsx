import React from "react";
import { navbar } from "@/constant/constant";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="flex space-x-6 mb-5 px-5 border-b h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {navbar.map((item) => (
          <Link
            key={item.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
