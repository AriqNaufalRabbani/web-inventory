"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import { isLoggedIn } from "@/lib/auth";
import { useNavByRole } from "./sidebar/data";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const nav = useNavByRole(); // Sidebar menu filtered by role
  const [user, setUser] = useState<{ role?: number } | null>(null);

  // Mapping route ke role
  const roleAccess: Record<string, number[]> = {
    "/Master/Users": [1, 2],
    "/Master/Items": [1, 2],
    "/Master/Suppliers": [1, 2],
    "/Master/Customers": [1, 2],
    "/Transaksi/PO": [1, 2, 3],
    "/Transaksi/GR": [1, 2, 3],
    "/Transaksi/SO": [1, 2, 3],
    "/Transaksi/Delivery": [1, 2, 3],
    "/Approvals": [1, 2, 3],
    "/Reports": [1, 2],
  };

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    // Ambil user dari localStorage
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // Pastikan role selalu number (default 0)
        setUser({
          ...parsedUser,
          role: typeof parsedUser.role === "number" ? parsedUser.role : 0,
        });
      } catch (e) {
        console.error("Invalid user data in localStorage", e);
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);
  console.log(user)

  useEffect(() => {
    if (!loading) {
      // Jika belum login
      if (!isLoggedIn() && !isLoginPage) {
        router.push("/login");
      }
      // Jika sudah login tapi berada di halaman login
      else if (isLoggedIn() && isLoginPage) {
        router.push("/dashboard");
      }
      // Jika role tidak punya akses ke halaman
      else if (user && roleAccess[pathname] && !roleAccess[pathname].includes(user.role ?? 0)) {
        router.push("/dashboard"); // Bisa ganti ke halaman 403
      }
    }
  }, [loading, router, pathname, user]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isLoggedIn() && !isLoginPage) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col">
          <main className="mx-auto w-full max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* Sidebar menyesuaikan role */}
      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />
        <main className="mx-auto w-full max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
