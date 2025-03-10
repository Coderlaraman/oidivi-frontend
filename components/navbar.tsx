"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Languages, Menu, Check, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDashboard from "@/hooks/useDashboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "./language-provider";
type SupportedLanguages = "en" | "es" | "fr";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: SupportedLanguages; name: string }[] = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
  ];

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const isAuthPage = isLoginPage || isRegisterPage;

  const { user } = useDashboard();
  const isAuthenticated = !!user;

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login"); // Redirigir al login
  };

  const mainNavItems = isAuthenticated
    ? [
        { href: "/dashboard", label: t("nav.dashboard") },
        { href: "/services", label: t("nav.services") },
        { href: "/messages", label: t("nav.messages") },
      ]
    : [
        { href: "/features", label: t("nav.features") }, // Cambiado de home.features
        { href: "/pricing", label: t("nav.pricing") }, // Cambiado de home.pricing
        { href: "/about", label: t("nav.about") }, // Cambiado de home.about
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-neutral-700/90 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity duration-300"
        >
          <div className="relative w-32 sm:w-40">
            <Image
              src="/images/logo-light.png"
              alt="Logo Light"
              width={160}
              height={64}
              className="h-10 sm:h-12 w-auto block dark:hidden"
              priority
            />
            <Image
              src="/images/logo-dark.png"
              alt="Logo Dark"
              width={160}
              height={64}
              className="h-10 sm:h-12 w-auto hidden dark:block"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 items-center justify-between pl-6">
          {/* Main Navigation Items */}
          <div className="flex items-center space-x-6">
            {mainNavItems.map(({ href, label }) => (
              <Button key={href} variant="ghost" asChild>
                <Link
                  href={href}
                  className={
                    pathname === href ? "text-red-600 dark:text-red-400" : ""
                  }
                >
                  {label}
                </Link>
              </Button>
            ))}
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="flex items-center justify-between"
                  >
                    <span>{lang.name}</span>
                    {language === lang.code && (
                      <Check className="h-4 w-4 text-red-600" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Separator orientation="vertical" className="h-8 mx-2" />

            {/* Auth Section */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative flex items-center space-x-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profile_photo_url || ""} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block">
                      {user?.name || t("nav.profile")}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t("nav.profile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">{t("nav.settings")}</Link>
                  </DropdownMenuItem>
                  <Separator className="my-1" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">{t("nav.login")}</Link>
                </Button>
                <Button
                  variant="default"
                  className="bg-red-600 hover:bg-red-700"
                  asChild
                >
                  <Link href="/register">{t("nav.register")}</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {mainNavItems.map(({ href, label }) => (
                <DropdownMenuItem key={href} asChild>
                  <Link href={href}>{label}</Link>
                </DropdownMenuItem>
              ))}
              <Separator className="my-1" />
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t("nav.profile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">{t("nav.settings")}</Link>
                  </DropdownMenuItem>
                  <Separator className="my-1" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">{t("nav.login")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">{t("nav.register")}</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
