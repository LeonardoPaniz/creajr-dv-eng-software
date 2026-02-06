"use client";

import { AppSidebar } from "@/components/menu/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return <AppSidebar>{children}</AppSidebar>;
}

export default AppLayout;
