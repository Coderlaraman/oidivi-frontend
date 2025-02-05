"use client";
import { motion } from "framer-motion";

const sections = [
    {
        title: "Connect with Verified Helpers",
        description: "Find trusted professionals quickly and easily.",
    },
    {
        title: "Fast & Simple",
        description: "Search, compare, and contact experts in minutes.",
    },
    {
        title: "24/7 Support",
        description: "We are here to assist you anytime you need.",
    },
];


const FeaturesSection = () => {
    return (
        <section id="features" className="py-20 space-y-20 bg-gray-900">
            {sections.map((section, index) => (
                <motion.div
                    key={index}
                    className="container mx-auto px-6 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-semibold text-red-400">{section.title}</h2>
                    <p className="mt-4 text-lg text-gray-300">{section.description}</p>
                </motion.div>
            ))}
        </section>
    );
};

export default FeaturesSection;
