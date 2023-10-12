"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PiBugDuotone } from "react-icons/pi";
import classnames from "classnames";

const NavBar = () => {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex gap-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <PiBugDuotone className="h-7 w-7" />
      </Link>
      <ul className="flex gap-6">
        {links.map(({ label, href }) => {
          return (
            <Link
              key={label}
              className={classnames({
                "text-zinc-900": href === pathname,
                "text-zinc-500": href !== pathname,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={href}
            >
              {label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
