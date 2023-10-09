"use client";
import React from "react";
import { navbar } from "@/constant/constant";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  return (
    <nav className="flex space-x-6 mb-5 px-5 border-b h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {navbar.map((item) => (
          <li key={item.href}>
            <Link
              className={classnames({
                "text-zinc-900": currentPath === item.href,
                "text-zinc-500": currentPath !== item.href,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href={"/api/auth/signout"}>Sign Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href={"/api/auth/signin"}>Sign In</Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
