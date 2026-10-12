"use client";

import { useState } from "react";

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-[270px]">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="min-w-0 p-5 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}