import "./globals.css";
import { ThemeProvider } from "next-themes";
import React from "react";
import Header from "@/components/layout/Header/Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased md:max-w-3xl mx-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header className="mb-5" />
          <main className="px-2 md:px-0">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
