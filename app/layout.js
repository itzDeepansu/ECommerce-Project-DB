"use client";
// import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/Store/store";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "./libs/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Provider store={store}>{children}</Provider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
    // </ClerkProvider>
  );
}