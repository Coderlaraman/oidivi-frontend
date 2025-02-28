"use client";

import React from "react";

const DashboardFooter: React.FC = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200 text-center py-4 border-t border-gray-300 dark:border-gray-700">
      <p className="text-sm">
        © 2025 OiDiVi Helper.{" "}
        <span className="text-red-600 dark:text-red-700 font-semibold">
          All rights reserved.
        </span>
      </p>
    </footer>
  );
};

export default DashboardFooter;
