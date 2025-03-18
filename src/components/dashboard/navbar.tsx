"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "../theme-switcher";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface DashboardNavbarProps {
  showMenuButton?: boolean;
  onMenuClick?: () => void;
  menuOpen?: boolean;
}

export default function DashboardNavbar({
  showMenuButton = false,
  onMenuClick,
  menuOpen = false,
}: DashboardNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-200 border-b ${
        isScrolled
          ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm"
          : "bg-white dark:bg-zinc-950"
      }`}
    >
      <div className="container mx-auto max-w-full px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="h-9 w-9"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}

          <div className={showMenuButton ? "flex-1" : ""}></div>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
