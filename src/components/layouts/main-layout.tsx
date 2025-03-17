import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/elements/app-sidebar";
import { Outlet } from "react-router-dom";
import { useTheme } from "@/context/themeprovider";
import { Button } from "../ui/button";
import { account } from "@/lib/appwrite";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function MainLayout() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const user = localStorage.getItem("session");

  const onLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await account.deleteSession("current");
        localStorage.clear();
        toast.success("Logged out Successfully!");
        window.location.href = "/login";
      } catch (error) {
        toast.error("There is something wrong try again.");
        console.error(error);
      }
    }
  };

  async function getAuthUser() {
    const authUser = await account.get();
    return authUser.$id;
  }

  useEffect(() => {
    if (!getAuthUser()) {
      localStorage.clear();
    }
  }, []);

  if (!user) {
    return (window.location.href = "/login");
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="flex flex-col w-full">
        <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 border-b dark:border-white sticky top-0">
          <SidebarTrigger className="border-2 border-slate-500" />
          <div className="flex gap-2 items-center">
            <Button className="cursor-pointer" onClick={onLogout}>
              Logout
            </Button>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
