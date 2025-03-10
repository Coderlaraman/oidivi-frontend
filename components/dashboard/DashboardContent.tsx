"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Settings,
  Star,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import type { User as UserType } from "@/types/index";

type TranslationKeys =
  | "dashboard.services.title"
  | "dashboard.services.description"
  | "dashboard.services.emptyState"
  | "dashboard.requests.title"
  | "dashboard.requests.description"
  | "dashboard.requests.emptyState"
  | "dashboard.reviews.title"
  | "dashboard.reviews.description"
  | "dashboard.reviews.emptyState"
  | "dashboard.stats.completedTasks"
  | "dashboard.stats.activeServices"
  | "dashboard.stats.earnings"
  | "dashboard.stats.rating"
  | "dashboard.verified"
  | "dashboard.editProfile"
  | "dashboard.tabs.services"
  | "dashboard.tabs.requests"
  | "dashboard.tabs.reviews";

const calculateProgress = (value: number | undefined, max: number): number => {
  if (!value) return 0;
  return Math.min(Math.round((value / max) * 100), 100);
};

interface DashboardContentProps {
  user: UserType;
  onEditProfile: () => void;
}

export function DashboardContent({
  user,
  onEditProfile,
}: DashboardContentProps) {
  const { t } = useLanguage();

  const tabs = ["services", "requests", "reviews"] as const;

  type TabType = (typeof tabs)[number];

  const getTabTranslation = (
    tab: TabType,
    key: "title" | "description" | "emptyState"
  ) => {
    return t(`dashboard.${tab}.${key}` as TranslationKeys);
  };

  // Definir si el usuario está verificado basándonos en la existencia de email_verified_at o phone_verified_at.
  const isVerified =
    Boolean(user?.email_verified_at) || Boolean(user?.phone_verified_at);

  const stats = [
    {
      title: t("dashboard.stats.completedTasks"),
      value: user.stats?.completed_tasks || 0,
      icon: Clock,
      progress: calculateProgress(user.stats?.completed_tasks, 100),
    },
    {
      title: t("dashboard.stats.activeServices"),
      value: user.stats?.active_services || 0,
      icon: Calendar,
      progress: calculateProgress(user.stats?.active_services, 10),
    },
    {
      title: t("dashboard.stats.earnings"),
      value: `$${user.stats?.total_earnings?.toFixed(2) || "0.00"}`,
      icon: DollarSign,
      progress: calculateProgress(user.stats?.total_earnings, 1000),
    },
    {
      title: t("dashboard.stats.rating"),
      value: user.stats?.rating?.toFixed(1) || "0.0",
      icon: Star,
      progress: calculateProgress((user.stats?.rating || 0) * 20, 100),
    },
  ];

  return (
    <div className="space-y-6 bg-neutral-900">
      {/* User Profile Header */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200/80 dark:border-neutral-700/90">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-2 border-red-500">
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
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                {user?.name}
              </h1>
              <div className="flex items-center mt-1 space-x-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>ZIP: {user?.zip_code || "---"}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {user?.stats?.rating?.toFixed(1) || "0.0"}/5.0
                  </span>
                </div>
                {isVerified && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    {t("dashboard.verified")}
                  </Badge>
                )}
              </div>
            </div>
            <Button
              onClick={onEditProfile}
              variant="outline"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
            >
              <Settings className="h-4 w-4 mr-2" />
              {t("dashboard.editProfile")}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-white dark:bg-neutral-800 border-gray-200/80 dark:border-neutral-700/90">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.title}
                    </p>
                  </div>
                  <stat.icon className="h-10 w-10 text-red-500/50" />
                </div>
                <Progress
                  value={stat.progress}
                  className="mt-4 bg-gray-100 dark:bg-neutral-700"
                >
                  <div className="bg-red-600 h-full w-full rounded-full" />
                </Progress>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Activity Tabs */}
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-neutral-800 border border-gray-200/80 dark:border-neutral-700/90">
          <TabsTrigger
            value="services"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            {t("dashboard.tabs.services")}
          </TabsTrigger>
          <TabsTrigger
            value="requests"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            {t("dashboard.tabs.requests")}
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            {t("dashboard.tabs.reviews")}
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {tabs.map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <Card className="bg-white dark:bg-neutral-800 border-gray-200/80 dark:border-neutral-700/90">
                <CardHeader className="border-b border-neutral-700">
                  <CardTitle className="text-xl">
                    {getTabTranslation(tab, "title")}
                  </CardTitle>
                  <CardDescription className="text-neutral-400">
                    {getTabTranslation(tab, "description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-48 flex items-center justify-center text-neutral-500">
                    {getTabTranslation(tab, "emptyState")}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </motion.div>
      </Tabs>
    </div>
  );
}
