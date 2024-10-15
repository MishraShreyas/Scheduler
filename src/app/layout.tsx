import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/nav/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Scheduler",
  description: "Schedule stuff quickly and easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body>
            <main>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                ><SessionProvider>
                    <Navbar>
                    {children}
                    </Navbar>
                </SessionProvider></ThemeProvider>
            </main>
            <Toaster />
        </body>
    </html>
  );
}
