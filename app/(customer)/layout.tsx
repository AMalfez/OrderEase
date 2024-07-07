import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/customer/Footer";
import NavBar from "@/components/customer/NavBar";

export const metadata: Metadata = {
  title: "OrderEase",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-screen ">
      <NavBar/>
      {children}
      <Footer/>
    </section>
  );
}