"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Shield, Users, Clock, Star, Check, X } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { PublicNavbar } from "@/components/navigation/PublicNavbar";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t("home.feature.verifiedHelpers.title"),
      description: t("home.feature.verifiedHelpers.description"),
    },
    {
      icon: Users,
      title: t("home.feature.largeCommunity.title"),
      description: t("home.feature.largeCommunity.description"),
    },
    {
      icon: Clock,
      title: t("home.feature.quickResponse.title"),
      description: t("home.feature.quickResponse.description"),
    },
    {
      icon: Search,
      title: t("home.feature.easyToUse.title"),
      description: t("home.feature.easyToUse.description"),
    },
  ];

  const stats = [
    { number: "10K+", label: t("home.stats.users") },
    { number: "50K+", label: t("home.stats.completedTasks") },
    { number: "95%", label: t("home.stats.satisfaction") },
    { number: "24/7", label: t("home.stats.support") },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Client",
      content: t("home.testimonials.client1"),
      rating: 5,
      verifiedHelper: true,
      location: "90210",
    },
    {
      name: "Michael Chen",
      role: "Helper",
      content:
        "As a verified helper, I've completed over 100 tasks with a 4.9 rating. The verification system really helps build trust.",
      rating: 5,
      verifiedHelper: true,
      location: "10001",
    },
    {
      name: "Elena Rodriguez",
      role: "Client",
      content:
        "Found an amazing helper in my ZIP code area. The multilingual support made communication easy!",
      rating: 5,
      verifiedHelper: true,
      location: "33101",
    },
  ];

  const plans = [
    {
      name: t("home.pricing.basic.name"),
      price: "$0",
      features: [
        t("home.pricing.basic.feature1"),
        t("home.pricing.basic.feature2"),
        t("home.pricing.basic.feature3"),
      ],
      recommended: false,
    },
  ];

  const faqs = [
    {
      question: t("home.faq.question1"),
      answer: t("home.faq.answer1"),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <PublicNavbar />

      {/* Hero Section */}
      <div className="relative h-[85vh] overflow-hidden bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />
        <div className="container relative h-full flex flex-col items-center justify-center text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("home.title")}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("home.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              asChild
              className="bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-900 text-white"
            >
              <Link href="/register">{t("home.getStarted")}</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-gray-100 dark:bg-neutral-900">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
            {t("home.features")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 hover:border-red-600 dark:hover:border-red-800 transition-colors"
              >
                <feature.icon className="w-12 h-12 mb-4 text-red-700 dark:text-red-600" />
                <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-red-600 dark:bg-red-800 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-red-100 dark:text-red-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
            {t("home.howItWorks.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-red-600 dark:bg-red-800 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                  {t(`home.howItWorks.step${step}` as keyof typeof t)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t(
                    `home.howItWorks.step${step}Description` as keyof typeof t
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-100 dark:bg-neutral-900">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16 text-black dark:text-white">
            {t("home.testimonials.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 p-8 rounded-lg hover:border-red-600 dark:hover:border-red-800 transition-colors"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-red-600 dark:text-red-600 fill-red-600 dark:fill-red-400"
                      />
                    ))}
                  </div>
                  {testimonial.verifiedHelper && (
                    <Shield className="w-5 h-5 text-red-600 dark:text-red-600" />
                  )}
                </div>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  {testimonial.content}
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-semibold text-black dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ZIP: {testimonial.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/80 dark:bg-neutral-900/95 backdrop-blur-sm">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-red-700 to-red-500 dark:from-red-700 dark:to-red-300 bg-clip-text text-transparent"
          >
            {t("home.faq.title")}
          </motion.h2>

          <div className="max-w-5xl mx-auto space-y-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ type: "spring", stiffness: 120 }}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-red-50/30 dark:bg-red-900/10 w-1.5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />

                <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-neutral-700/80 hover:border-red-200 dark:hover:border-red-400/30 ml-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <span className="text-red-700 dark:text-red-600 font-bold">
                          ?
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed prose dark:prose-invert">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">
            {t("home.cta.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t("home.cta.description")}
          </p>
          <Button
            size="lg"
            asChild
            className="bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-900 text-white"
          >
            <Link href="/register">{t("home.cta.button")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
