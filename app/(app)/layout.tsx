"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  ImageIcon,
  FileIcon,
  VideoIcon,
} from "lucide-react";

// Shadcn/ui components
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ModeToggle";
import { ThemeProvider } from "@/components/theme-provider";
import PaymentButton from "@/components/PaymentButton";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: VideoIcon, label: "Video Upload" },
  { href: "/pdf-upload", icon: FileIcon, label: "PDF Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isPro, setIsPro] = useState(false); // State to manage Pro status, you can replace this with your own logic
  const { signOut } = useClerk();
  const { user } = useUser();

  const fetchUserStatus = async () => {
    try {
      const response = await fetch("/api/user-status");
      if (!response.ok) {
        throw new Error("Failed to fetch user status");
      }
      const data = await response.json();
      if (data.message === "User is a Pro member") {
        setIsPro(true);
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, []);

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (

    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen ">
        {/* Mobile Sidebar using Shadcn Sheet */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0 ">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-center py-4 border-b">
                <ImageIcon className="w-10 h-10 text-primary" />
              </div>
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {sidebarItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center space-x-4 p-2 rounded-md transition-colors   ${pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                          }`}
                      >
                        <item.icon className="w-6 h-6" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {user && (
                <>
                  <Separator />
                  <div className="p-4">
                    <Button
                      variant="destructive"
                      onClick={handleSignOut}
                      className="w-full   text-white"
                    >
                      <LogOutIcon className="mr-2 w-5 h-5" />
                      Sign Out
                    </Button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64  border-r">
          <div className="flex items-center justify-center py-4 border-b">
            <ImageIcon className="w-10 h-10 text-violet-800" />
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-4 p-2 rounded-md transition-colors   ${pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                      }`}
                  >
                    <item.icon className="w-6 h-6" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {user && (
            <>
              <Separator />
              <div className="p-4 ">
                <Button
                  variant="destructive"
                  onClick={handleSignOut}
                  className="w-full  text-white"
                >
                  <LogOutIcon className="mr-2 w-5 h-5" />
                  Sign Out
                </Button>
              </div>
            </>
          )}
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <header className="w-full bg-background border-b py-1">
            <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
              <div className="flex items-center ">
                {/* Mobile menu trigger */}
                <Button
                  variant="ghost"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <MenuIcon className="w-20 h-20" />
                </Button>
                <Link href="/" onClick={handleLogoClick}>
                  <span className="text-xl sm:text-2xl font-bold cursor-pointer">
                    Dashboard
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <ModeToggle />
                {/* Payment Button */}
                {!isPro && <PaymentButton />}
                {/* User Avatar and Sign Out */}
                {user && (
                  <>
                    <Avatar>
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.username || user.emailAddresses[0].emailAddress}
                      />
                      <AvatarFallback>
                        {user.username
                          ? user.username.charAt(0)
                          : user.emailAddresses[0].emailAddress.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm truncate max-w-xs">
                      {user.firstName || user.emailAddresses[0].emailAddress}
                    </span>
                    <Button variant="ghost" onClick={handleSignOut}>
                      <LogOutIcon className="w-6 h-6" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-4">{children}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
