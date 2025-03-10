"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Languages,
  Menu,
  Check,
  User,
  Bell,
  Search,
  Plus,
  ShoppingCart,
  Settings,
  LogOut,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../language-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import useDashboard from "@/hooks/useDashboard";

type SupportedLanguages = "en" | "es" | "fr";

interface PrivateNavbarProps {
  onMenuClick?: () => void;
}

export function PrivateNavbar({ onMenuClick }: PrivateNavbarProps) {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const { user } = useDashboard();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const languages: { code: SupportedLanguages; name: string }[] = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
  ];

  const mainNavItems = [
    { href: "/dashboard", label: t("nav.dashboard"), icon: User },
    { href: "/services", label: t("nav.services"), icon: ShoppingCart },
    { href: "/messages", label: t("nav.messages"), icon: Bell },
    { href: "/invoices", label: t("nav.invoices"), icon: Bell },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  const notificationCount = 3; // Este valor vendría de un contexto o estado global

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-neutral-700/90 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl">
      <div className="container flex h-16 items-center">
        {/* Logo Section */}
        <div className="flex-shrink-0 px-4">
          <Link href="/dashboard">
            <div className="relative w-32 sm:w-40">
              <Image
                src="/images/logo-light.png"
                alt="Logo"
                width={160}
                height={64}
                className="h-8 w-auto block dark:hidden"
                priority
              />
              <Image
                src="/images/logo-dark.png"
                alt="Logo"
                width={160}
                height={64}
                className="h-8 w-auto hidden dark:block"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-between">
          {/* Main Navigation Items */}
          <nav className="flex items-center space-x-4">
            {mainNavItems.map(({ href, label, icon: Icon }) => (
              <Button
                key={href}
                variant="ghost"
                size="sm"
                className={`${
                  pathname === href
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                asChild
              >
                <Link href={href} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* Right Side Items */}
          <div className="flex items-center space-x-2 px-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <MapPin className="mr-2 h-4 w-4" />
              ZIP: {user?.zip_code || "---"}
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-red-600 text-white rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                  >
                    <span>{lang.name}</span>
                    {language === lang.code && (
                      <Check className="ml-2 h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    {user?.profile_photo_url ? (
                      <AvatarImage
                        src={user.profile_photo_url}
                        alt={user?.name || "Profile"}
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const fallback = target.nextSibling as HTMLDivElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <AvatarFallback className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-100">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{t("nav.profile")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t("nav.settings")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("nav.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-end lg:hidden">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-red-600 text-white rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="ml-2"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
