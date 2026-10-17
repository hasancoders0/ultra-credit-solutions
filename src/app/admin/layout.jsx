
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Standalone login page: no dashboard sidebar or header.
  if (isLoginPage) {
    return <div className="min-h-screen bg-[#F5F7FB]">{children}</div>;
  }

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
