"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHamburger } from "react-icons/fa";

const NavBar = () => {
  const [state, setState] = useState(false);

  // Replace javascript:void(0) paths with your paths
  const navigation = [
    { title: "Business", path: "/restaurant" },
    { title: "About us", path: "/about" },
    {title: "Cart", path:"/cart"},
    {title: "History", path:"/order-history"}
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!(target as HTMLElement)?.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      className={`bg-white shadow-sm pb-5 md:text-sm ${
        state
          ? "shadow-lg rounded-xl border mt-2 md:shadow-none lg:border-none lg:mt-0"
          : ""
      }`}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 lg:flex lg:px-8">
        <div className="flex items-center justify-between py-5 lg:block">
          <Link
            href="/"
            className="flex justify-center font-semibold text-gray-900"
          >
            <FaHamburger className="text-orange-600 px-1 text-3xl md:text-4xl" />
            <span className="font-bold text-2xl md:text-3xl">
              <span>Order</span>
              <span className="text-rose-800">Ease</span>
            </span>
          </Link>
          <div className="lg:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center text-xl mt-8 lg:mt-0 lg:flex ${
            state ? "block" : "hidden"
          } `}
        >
          <ul className="justify-center items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-gray-700 hover:text-gray-900">
                  <Link href={item.path} className="block">
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 lg:flex lg:space-y-0 lg:mt-0">
            <SignedOut>
              <SignInButton>
                <button className="lg:border lg:px-5 py-2 lg:rounded-md">Sign in</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton showName={true} userProfileMode="modal" appearance={{elements:{userButtonOuterIdentifier:"text-xl font-normal", userButtonBox:"px-5 py-2 outline-none border-0"}}} />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
