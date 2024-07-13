"use client"
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { signOut } = useClerk();
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="flex flex-col gap-8 md:flex md:flex-row border-b justify-between py-3 pl-16 pr-5 md:pr-16 text-lg">
      <div className="flex justify-between md:hidden">
        <p className="font-bold">Navbar</p>
        <button className="cursor-pointer" onClick={() => setToggle(!toggle)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`lucide lucide-menu ${toggle && "hidden"}`}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`lucide lucide-x ${!toggle && "hidden"}`}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div className={`flex flex-col md:flex md:flex-row gap-8 font-semibold ${toggle?"flex":"hidden"}`}>
        <Link href="/restaurant/dashboard" className={`${pathname === "/restaurant/dashboard"?"text-black":"text-neutral-500"}`}>Home</Link>
        <Link href="/restaurant/dashboard/customers" className={`${pathname === "/restaurant/dashboard/customers" ?"text-black":"text-neutral-500"}`}>Customers</Link>
        <Link href="/restaurant/dashboard/menu" className={`${pathname === "/restaurant/dashboard/menu" ?"text-black":"text-neutral-500"}`}>Menu</Link>
        <Link href="/restaurant/dashboard/settings" className={`${pathname === "/restaurant/dashboard/settings" ?"text-black":"text-neutral-500"}`}>Settings</Link>
      </div>
      <div className={`md:inline w-fit ${toggle?"inline":"hidden"}`} onClick={() => signOut({ redirectUrl: '/' })}>
        Sign out
      </div>
    </nav>
  );
};
export default Navbar;
