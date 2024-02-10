import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../providers/theme-provider";
import { Toaster } from "../components/_ui-shadcn/toaster";
import Footer from "../components/layout/footer/footer";
import Header from "../components/layout/header/home/header-home";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "code.dev",
  description: "Aqui você encontra de tudo um pouco sobre programação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
