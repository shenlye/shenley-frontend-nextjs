"use client";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import React from "react";
import Header from "@/components/layout/Header/Header";
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
          <Header className="mb-8 bg-slate-100 dark:bg-slate-800"/>
          <main className="md:max-w-4xl mx-auto p-2">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
