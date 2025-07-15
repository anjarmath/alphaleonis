import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import UserButton from "@/features/auth/component/UserButton";

const DashboardTopBar = async () => {
  return (
    <header className="bg-sidebar sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <SidebarTrigger />
      <UserButton />
    </header>
  );
};

export default DashboardTopBar;
