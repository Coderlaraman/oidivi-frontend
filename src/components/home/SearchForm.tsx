"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const [helpersCount, setHelpersCount] = useState<number | null>(null);

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `http://oidivi-api.local/api/v1/client/helpers?category=${searchTerm}&location=${location}`
            );
            const data = await response.json();
            setHelpersCount(data.count);
        } catch (error) {
            console.error("Error fetching helpers:", error);
        }
    };

    return (
        <motion.section
            className="py-16 bg-gray-900 dark:bg-gray-800 text-white text-center px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h3 className="text-2xl font-semibold mb-6 text-red-400">
                Find a Helper
            </h3>
            <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 px-4">
                <input
                    type="text"
                    placeholder="Category (Ej: Plumber, Electrician)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-500 rounded text-gray-900"
                />
                <input
                    type="text"
                    placeholder="Location (ZIP Code)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-2/5 p-3 border border-gray-500 rounded text-gray-900"
                />
                <button
                    onClick={handleSearch}
                    className="w-full sm:w-auto bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
                >
                    Search
                </button>
            </div>
            {helpersCount !== null && (
                <p className="mt-6 text-lg">{helpersCount} helpers found.</p>
            )}
        </motion.section>
    );
};

export default SearchForm;
