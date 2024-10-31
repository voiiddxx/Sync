import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter , Poppins } from "next/font/google"; 
import "./globals.css";
import StoreProvider from "./StoreProvider";

// Load local fonts
const geistSans = localFont({
  src: "./fonts/Gilroy-Bold.ttf",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/Gilroy-Medium.ttf",
  variable: "--font-geist-mono",
});


const inter = Poppins({
  subsets: ["latin"],
  weight:['100' , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"],
  variable: "--font-inter", // Optional: Add CSS variable if needed
});

export const metadata: Metadata = {
  title: "Floww",
  description: "Automate your commits and PR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} `}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
