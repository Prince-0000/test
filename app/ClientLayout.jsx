"use client";

import NavPage from "./Components/Navbar/NavContent";
import FooterPage from "./Components/Footer/FooterContent";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Adjust as needed
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <ThemeProvider defaultTheme="dark" enableSystem>
     {loading && (
  <div className="fixed inset-0 flex items-center justify-center 
                  backdrop-blur-md bg-black/70 z-[9999]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-500"></div>
  </div>
)}

      <section className="sticky top-0 z-50 bg-black">
        <NavPage />
      </section>
      <section>{children}</section>
      <FooterPage />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}
