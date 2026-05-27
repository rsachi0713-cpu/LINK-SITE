"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: 36, height: 36 }} />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "var(--toggle-bg, rgba(0, 0, 0, 0.05))",
        color: "var(--text-main, #334155)",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "var(--toggle-bg-hover, rgba(0, 0, 0, 0.1))";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "var(--toggle-bg, rgba(0, 0, 0, 0.05))";
      }}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
