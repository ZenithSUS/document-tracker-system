import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/elements/app-sidebar";
import { Outlet } from "react-router-dom";
import { useTheme } from "@/context/themeprovider";

export default function MainLayout() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="flex flex-col w-full">
        <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 border-b dark:border-white sticky top-0">
          <SidebarTrigger className="border-2 border-slate-500" />
          <button onClick={toggleDarkMode}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
