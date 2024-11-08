"use client";
import Link from "next/link";
import { FaHamburger } from "react-icons/fa";

function LogoLink() {
  return (
    <Link href="/" className="flex justify-center font-semibold text-gray-900">
      <FaHamburger className="text-orange-600 px-1 text-3xl md:text-4xl" />
      <span className="font-bold text-2xl md:text-3xl">
        <span>Order</span>
        <span className="text-rose-800">Ease</span>
      </span>
    </Link>
  );
}

export default LogoLink;
