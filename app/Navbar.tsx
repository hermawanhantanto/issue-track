"use client";
import React, { useEffect, useState } from "react";
import { navbar } from "@/constant/constant";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { getSession, useSession } from "next-auth/react";
import { Skeleton } from "./components";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const Navbar = () => {
  const currentPath = usePathname();

  return (
    <nav className="flex mb-5 px-5 border-b h-14 items-center">
      <Container>
        <Flex justify="between">
          <Flex gap="6" align="center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <Navlink />
          </Flex>
          <AuthBar />
        </Flex>
      </Container>
    </nav>
  );
};

const Navlink = () => {
  const currentPath = usePathname();
  return (
    <ul className="flex space-x-6">
      {navbar.map((item) => (
        <li key={item.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": currentPath === item.href,
            })}
            href={item.href}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthBar = () => {
  const [session, setSession] = useState<any>();
  const [status, setStatus] = useState<string>("loading");

  const fetchData = async () => {
    try {
      const data = await getSession();
      console.log(data);
      if (data) {
        setSession(data.user);
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    } catch (error) {
      console.log(error);
      setStatus("unauthenticated");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link href={"/api/auth/signin"} className="nav-link">
        Sign In
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.image!}
            fallback="?"
            radius="full"
            size="3"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.email!}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={"/api/auth/signout"}>Sign Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
