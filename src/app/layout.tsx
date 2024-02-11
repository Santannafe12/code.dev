import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../providers/themeProvider";
import { Toaster } from "../components/_ui/toaster";
import Footer from "../components/layout/footer/footer";
import Header from "../components/layout/header/home/header-home";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/pt-BR',
    },
  },
  title: {
    default: 'Home',
    template: '%s - code.dev',
  },
  description: "Aqui você encontra de tudo um pouco sobre programação",
  openGraph: {
    images: '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@codedotdev',
  }
}

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
