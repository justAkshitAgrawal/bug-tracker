import "./globals.css";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "sonner";
import Provider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Bug Tracker",
  description: "Easily track bugs and issues in your projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Provider>
          <Theme appearance="light" accentColor="violet">
            <NavBar />
            <main className="p-5">{children}</main>
            <Toaster richColors />
          </Theme>
        </Provider>
      </body>
    </html>
  );
}
