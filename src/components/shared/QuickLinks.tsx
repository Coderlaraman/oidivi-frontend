'use client';

import React from 'react';

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
      <h2 className="text-2xl font-bold text-red-600">Quick Actions</h2>
      <div className="flex space-x-4">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={link.onClick}
            className="py-2 px-4 bg-gradient-to-r from-red-500 to-black text-white font-bold rounded hover:from-red-600 hover:to-gray-800 transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;
