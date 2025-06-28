"use client";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import React from "react";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/animation/PageTransition";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="">
            <PageTransition key={pathname}>{children}</PageTransition>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
