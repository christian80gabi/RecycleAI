import { Inter } from "next/font/google";
import Navbar from "../components/navbar/navbar";
import "./../styles/globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RecycleAI",
  description: "An app that aims to fight climate change",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
