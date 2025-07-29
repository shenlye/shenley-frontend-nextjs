import "./globals.css";
import { ThemeProvider } from "next-themes";
import React from "react";
import Header from "@/components/Header/Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased mx-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header className="mb-5" />
          <main className="px-2 md:px-0 max-w-2xl mx-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
