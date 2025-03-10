"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  MessageSquare,
  Settings,
  HelpCircle,
  FileText,
  Users,
  Star,
  Bell,
  Wallet,
  MapPin,
  ChevronRight,
  ArrowRightLeft,
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
import { en } from "@/translations/en";
import { fr } from "@/translations/fr";
import { scheduler } from "node:timers/promises";

interface SidebarDesktopProps {
  onEditProfile: () => void;
}

export default function SidebarDesktop({ onEditProfile }: SidebarDesktopProps) {
  const router = useRouter();
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

  return (
    <TooltipProvider>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:flex lg:flex-col w-72 border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 h-full"
      >
        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200 dark:border-neutral-800">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar
              className="h-12 w-12 cursor-pointer"
              onClick={onEditProfile}
            >
              <AvatarImage src={user?.profile_photo_url ?? undefined} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          {/* User Stats */}
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
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-2">
          <div className="space-y-4">
            {/* Main Navigation */}
            <div className="px-3 py-2">
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <Tooltip key={item.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-gray-100 dark:bg-neutral-800 text-red-600 dark:text-red-400"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800/50"
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
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
                    <TooltipContent side="right" className="flex items-center">
                      {item.title}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            <Separator className="mx-3" />

            {/* Secondary Navigation */}
            <div className="px-3 py-2">
              <div className="space-y-1">
                {secondaryNavItems.map((item) => (
                  <Tooltip key={item.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-gray-100 dark:bg-neutral-800 text-red-600 dark:text-red-400"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800/50"
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="border-t border-gray-200 dark:border-neutral-800 p-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={onEditProfile}
          >
            <Users className="mr-2 h-4 w-4" />
            {t("sidebar.editProfile")}
          </Button>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
