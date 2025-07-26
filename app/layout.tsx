"use client";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import React from "react";
import Header from "@/components/layout/Header/Header";
import PageTransition from "@/components/animation/PageTransition";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header className="mb-4"/>
          <main className="md:max-w-7xl mx-auto px-2 md:px-0 perspective-midrange relative">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
