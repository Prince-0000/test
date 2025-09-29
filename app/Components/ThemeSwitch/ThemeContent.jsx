"use client";

import { useTheme } from "next-themes";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until after client-side hydration to show UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid hydration mismatch

  return (
    <button
      className="text-2xl"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "dark" ? (
        <FaToggleOn className="text-violet-700" />
      ) : (
        <FaToggleOff className="text-gray-800" />
      )}
    </button>
  );
}
