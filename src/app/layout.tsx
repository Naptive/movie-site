import BottomNav from "@/component/bottom-navigation";
import "./globals.css";
import { Poppins } from "next/font/google";
import Nav from "@/component/nav";
import { Providers } from "./providers";
import { Metadata } from "next";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "WilliamFlix.com",
  description: "Latest Movies At Your Finger Tips",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Nav />
          {children}
          <BottomNav />
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7915291545340615"
          />
        </Providers>
      </body>
    </html>
  );
}
