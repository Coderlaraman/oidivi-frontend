"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Calendar,
  MessageSquare,
  Settings,
  HelpCircle,
  Users,
  Star,
  Wallet,
  MapPin,
  ChevronRight,
  ArrowRightLeft,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import useDashboard from "@/hooks/useDashboard";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface SidebarProps {
  onEditProfile: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({
  onEditProfile,
  isMobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user } = useDashboard();

  const mainNavItems = [
    {
      title: t("sidebar.overview"),
      href: "/dashboard",
      icon: Home,
      badge: null,
    },
    {
      title: t("sidebar.schedule"),
      href: "/schedule",
      icon: Calendar,
      badge: "5",
    },
    {
      title: t("sidebar.messages"),
      href: "/messages",
      icon: MessageSquare,
      badge: "3",
    },
    {
      title: t("sidebar.services"),
      href: "/services",
      icon: ArrowRightLeft,
      badge: null,
    },
    {
      title: t("sidebar.reviews"),
      href: "/reviews",
      icon: Star,
      badge: "New",
    },
  ];

  const secondaryNavItems = [
    {
      title: t("sidebar.billing"),
      href: "/billing",
      icon: Wallet,
      description: t("sidebar.billingDesc"),
    },
    {
      title: t("sidebar.settings"),
      href: "/settings",
      icon: Settings,
      description: t("sidebar.settingsDesc"),
    },
    {
      title: t("sidebar.help"),
      href: "/help",
      icon: HelpCircle,
      description: t("sidebar.helpDesc"),
    },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarContent = (
    <>
      {/* Toggle Collapse Button - Reposicionado */}
      <div className="p-4 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="lg:flex hidden"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-200 dark:border-neutral-800">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-12 w-12 cursor-pointer" onClick={onEditProfile}>
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
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400">
                {t("sidebar.reputation")}
              </span>
              <span className="font-medium text-red-600 dark:text-red-400">
                4.8/5.0
              </span>
            </div>
            <Progress value={96} className="h-1" />
            <div className="flex items-center space-x-2">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ZIP: {user?.zip_code || "---"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          {/* Main Navigation */}
          <div className="px-3 py-2">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <TooltipProvider key={item.href}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={isMobileOpen ? onMobileClose : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-gray-100 dark:bg-neutral-800 text-red-600 dark:text-red-400"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800/50"
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-4 w-4" />
                          {!isCollapsed && (
                            <span className="ml-2">{item.title}</span>
                          )}
                        </div>
                        {!isCollapsed && item.badge && (
                          <Badge
                            variant={
                              item.badge === "New" ? "default" : "secondary"
                            }
                            className={cn(
                              "ml-auto",
                              item.badge === "New" &&
                                "bg-red-600 hover:bg-red-700"
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {(isCollapsed || item.badge) && (
                      <TooltipContent
                        side="right"
                        className="flex items-center"
                      >
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant={
                              item.badge === "New" ? "default" : "secondary"
                            }
                            className="ml-2"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          <Separator className="mx-3" />

          {/* Secondary Navigation */}
          <div className="px-3 py-2">
            <div className="space-y-1">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={isMobileOpen ? onMobileClose : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-gray-100 dark:bg-neutral-800 text-red-600 dark:text-red-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800/50"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-2">{item.title}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Only Navigation */}
          <div className="px-3 py-2 lg:hidden">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-red-600 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isCollapsed ? "4rem" : "18rem",
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "hidden lg:flex flex-col border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 h-full relative"
        )}
      >
        {sidebarContent}
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-neutral-900 z-50 flex flex-col lg:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
