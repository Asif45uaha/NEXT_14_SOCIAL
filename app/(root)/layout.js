import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "../provider";
import SessionProvider from "@/components/SessionProvider";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NEXT-14 Social/main",
  description: "Next Social Media App using NEXT-14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Provider >
            <Navbar />
            {children}
            <Footer />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
