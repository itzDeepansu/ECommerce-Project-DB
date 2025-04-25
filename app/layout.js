import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import localFont from "next/font/local";

const monaSans = localFont({
  src: [
    {
      path: '../public/mona.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-mona',
  display: 'swap',
})
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShopNi",
  description: "A new age Ecommerce Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={monaSans.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
