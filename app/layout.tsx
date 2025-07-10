"use client";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import React from "react";
import { Header } from "@/components/layout/Header";

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
          <Header />
          <main className="">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
