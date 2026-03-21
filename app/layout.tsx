import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { AppStoreProvider } from "@/lib/store";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoPulse",
  description: "AI-powered campus reuse that keeps useful materials out of the trash.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppStoreProvider>
          <Nav />
          <main className="mx-auto min-h-[calc(100vh-88px)] max-w-6xl px-5 py-10 md:px-6 md:py-12">
            {children}
          </main>
        </AppStoreProvider>
      </body>
    </html>
  );
}
