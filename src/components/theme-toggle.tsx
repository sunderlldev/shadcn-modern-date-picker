"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return document.documentElement.classList.contains("dark");
  });

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(root.classList.contains("dark"));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-8 w-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}
