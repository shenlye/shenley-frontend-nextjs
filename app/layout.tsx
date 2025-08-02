import "./globals.css";
import "./font/Blueaka/Blueaka.css";
import "./font/Blueaka_Bold/Blueaka_Bold.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Shenley的个人主页",
  description: "Shenley的个人主页",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`font-['Blueaka'] antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header className="" />
          <main className="max-w-4xl mx-auto px-4 md:px-0 flex-1 flex flex-col justify-center items-center gap-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
