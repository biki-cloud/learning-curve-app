"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/mylib/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true); // ナビゲーションバーの状態を管理

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex">
            <NavBar setIsOpen={setIsOpen} /> {/* NavBarに状態を渡す */}
            <main className={`flex-1 p-4 ${isOpen ? "ml-64" : "ml-0"}`}>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
