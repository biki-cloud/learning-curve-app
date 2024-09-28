"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/components/mylib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import { User } from "@/components/mylib/api";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const items = [
  {
    title: "一覧",
    href: "/learningContent/list",
    icon: <ListIcon />,
  },
  {
    title: "学習",
    href: "/learningContent/learning",
    icon: <LightbulbIcon />,
  },
  {
    title: "作成",
    href: "/learningContent/create",
    icon: <AddIcon />,
  },
  {
    title: "Signin",
    href: "/user/signin",
    icon: <PersonAddAltIcon />,
  },
  {
    title: "Signup",
    href: "/user/signup",
    icon: <InsertEmoticonIcon />,
  },
];

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(true); // サイドバーの開閉状態
  const pathname = usePathname();

  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // サイドバーの開閉をトグル
  };

  return (
    <div
      className={`w-${
        isOpen ? "48" : "0"
      } h-screen bg-gray-100 p-4 transition-width duration-300`}
    >
      <button onClick={toggleSidebar} className="mb-4 flex items-center">
        {isOpen ? <ArrowCircleLeftIcon /> : <ArrowCircleRightIcon />}
      </button>
      {isOpen && (
        <>
          {user && (
            <div className="mb-4 p-2 bg-white rounded shadow">
              <p className="font-bold">{user.username}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          )}
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
        </>
      )}
    </div>
  );
};

export default NavBar;
