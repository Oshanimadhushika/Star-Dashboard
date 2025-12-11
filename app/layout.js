import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationContextProvider } from "./context/NotificationContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Star-Dashboard",
  description: "Star-Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <NotificationContextProvider>
            {children}
          </NotificationContextProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
