import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knitting - Store",
  description: "Knitting - Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
          <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body className={inter.className}>
        <ClerkProvider>
            <ToasterProvider/>
            <Navbar/>
            {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
