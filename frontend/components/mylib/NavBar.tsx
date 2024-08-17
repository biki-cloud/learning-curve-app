"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";

const items = [
  {
    title: "一覧",
    href: "/learningContent/list",
    icon: <ListIcon />,
  },
  {
    title: "作成",
    href: "/learningContent/create",
    icon: <AddIcon />,
  },
];

const NavBar = () => {
  const pathname = usePathname();
  return (
    <div className="w-48 h-screen bg-gray-100 p-4">
      <nav className="flex flex-col space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "flex items-center justify-start"
            )}
          >
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
