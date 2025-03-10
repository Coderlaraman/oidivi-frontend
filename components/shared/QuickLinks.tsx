"use client";

import React from "react";

interface QuickLink {
  label: string;
  onClick: () => void;
}

interface QuickLinksProps {
  links: QuickLink[];
}

const QuickLinks: React.FC<QuickLinksProps> = ({ links }) => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-700">
        Quick Actions
      </h2>
      <div className="flex flex-wrap gap-4">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={link.onClick}
            className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 transition"
          >
            {link.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;
