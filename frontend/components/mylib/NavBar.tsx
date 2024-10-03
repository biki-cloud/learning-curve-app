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
import dynamic from "next/dynamic";

const List = dynamic(() => import("lucide-react").then((mod) => mod.List), {
  ssr: false,
});
const Lightbulb = dynamic(
  () => import("lucide-react").then((mod) => mod.Lightbulb),
  { ssr: false }
);
const PlusCircle = dynamic(
  () => import("lucide-react").then((mod) => mod.PlusCircle),
  { ssr: false }
);
const UserPlus = dynamic(
  () => import("lucide-react").then((mod) => mod.UserPlus),
  { ssr: false }
);
const Smile = dynamic(() => import("lucide-react").then((mod) => mod.Smile), {
  ssr: false,
});
const ChevronLeft = dynamic(
  () => import("lucide-react").then((mod) => mod.ChevronLeft),
  { ssr: false }
);
const ChevronRight = dynamic(
  () => import("lucide-react").then((mod) => mod.ChevronRight),
  { ssr: false }
);
const Moon = dynamic(() => import("lucide-react").then((mod) => mod.Moon), {
  ssr: false,
});
const Sun = dynamic(() => import("lucide-react").then((mod) => mod.Sun), {
  ssr: false,
});

const items = [
  { title: "一覧", href: "/learningContent/list", icon: List },
  { title: "学習", href: "/learningContent/learning", icon: Lightbulb },
  { title: "作成", href: "/learningContent/create", icon: PlusCircle },
  { title: "Signin", href: "/user/signin", icon: UserPlus },
  { title: "Signup", href: "/user/signup", icon: Smile },
];

export default function ModernNavBar({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpenState] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
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
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsOpenState(!isOpen);
    setIsOpen(!isOpen);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 h-screen bg-background transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-full flex-col justify-between p-3">
        <div>
          <Button
            variant="ghost"
            size="icon"
            className="mb-4 w-full justify-center"
            onClick={toggleSidebar}
          >
            {isOpen ? (
              <ChevronLeft className="h-6 w-6" />
            ) : (
              <ChevronRight className="h-6 w-6" />
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
          <nav className="space-y-2">
            {items.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    isOpen ? "justify-start px-3" : "justify-center px-0"
                  )}
                >
                  {isMounted && (
                    <item.icon
                      className={cn("h-5 w-5", isOpen ? "mr-2" : "mr-0")}
                    />
                  )}
                  {isOpen && <span>{item.title}</span>}
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
            className={cn(
              "w-full",
              isOpen ? "justify-start px-3" : "justify-center px-0"
            )}
          >
            {theme === "light" ? (
              <Moon className={cn("h-5 w-5", isOpen ? "mr-2" : "mr-0")} />
            ) : (
              <Sun className={cn("h-5 w-5", isOpen ? "mr-2" : "mr-0")} />
            )}
            {isOpen && <span>テーマ切替</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
