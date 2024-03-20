/* eslint-disable @next/next/no-sync-scripts */
import { Inter } from "next/font/google";
import "./globals.css";
import { TanstackQueryClient } from "@/component/TanstackQuery/TanstackQuery";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="luxury" lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.7.3/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={inter.className}>
        <div>
          <TanstackQueryClient>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </TanstackQueryClient>
        </div>
      </body>
    </html>
  );
}
