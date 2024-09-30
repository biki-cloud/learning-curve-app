"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User } from "@/components/mylib/api";
import {
  List,
  Lightbulb,
  PlusCircle,
  UserPlus,
  Smile,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";

const items = [
  { title: "一覧", href: "/learningContent/list", icon: List },
  { title: "学習", href: "/learningContent/learning", icon: Lightbulb },
  { title: "作成", href: "/learningContent/create", icon: PlusCircle },
  { title: "Signin", href: "/user/signin", icon: UserPlus },
  { title: "Signup", href: "/user/signup", icon: Smile },
];

export default function ModernNavBar({ setIsOpen }) {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpenState] = useState(true);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

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
    setIsOpenState(!isOpen);
    setIsOpen(!isOpen); // 親コンポーネントに状態を通知
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 h-screen bg-background transition-all duration-300 ease-in-out", // z-indexを50に設定
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-full flex-col justify-between p-3">
        <div>
          <Button
            variant="ghost"
            size="icon"
            className="mb-4 w-full justify-start"
            onClick={toggleSidebar}
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {user && isOpen && (
            <div className="mb-4 flex items-center space-x-4 rounded-lg bg-muted p-4">
              <Avatar>
                <AvatarImage
                  src={`https://avatar.vercel.sh/${user.username}`}
                />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.username}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          )}
          <nav className="space-y-1">
            {items.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", !isOpen && "px-2")}
                >
                  <item.icon className="h-4 w-4" />
                  {isOpen && <span className="ml-2">{item.title}</span>}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <Separator className="my-4" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-full justify-start"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            {isOpen && <span className="ml-2">テーマ切替</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
