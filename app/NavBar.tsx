"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PiBugDuotone } from "react-icons/pi";
import classnames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Button, DropdownMenu, Text } from "@radix-ui/themes";
import Image from "next/image";

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="mb-5 flex h-14 items-center justify-between gap-6 border-b px-5">
      <Link href={"/"}>
        <PiBugDuotone className="h-7 w-7" />
      </Link>
      <div className="flex items-center gap-8">
        <ul className="flex items-center gap-6 font-semibold">
          {links.map(({ label, href }) => {
            return (
              <li key={label}>
                <Link
                  className={classnames({
                    "text-zinc-900": href === pathname,
                    "text-zinc-500": href !== pathname,
                    "transition-colors hover:text-zinc-800": true,
                  })}
                  href={href}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        {status === "unauthenticated" && (
          <Button
            onClick={() => {
              signIn("google", {
                callbackUrl: "/",
              });
            }}
          >
            Sign in
          </Button>
        )}
        {status === "authenticated" && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              {/* <Avatar
                size={"3"}
                radius="full"
                src={session.user!.image!}
                fallback={session.user!.name![0]}
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              /> */}
              <div>
                <Image
                  src={session.user!.image!}
                  alt="Picture of the author"
                  height={30}
                  width={30}
                  className="cursor-pointer rounded-full"
                />
              </div>
              {/* <h1>Open Me</h1> */}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
              <DropdownMenu.Item>
                <Text
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign out
                </Text>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
