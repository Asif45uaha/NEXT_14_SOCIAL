import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "../provider";
import SessionProvider from "@/components/SessionProvider";
import AuthColorMode from "@/components/AuthColorMode";
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "NEXT-14 Social",
  description: "Auth Page For NEXT-14 Social",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Provider>
            <AuthColorMode />
            {children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
