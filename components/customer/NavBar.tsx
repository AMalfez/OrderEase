"use client";
import { getUserByUserId } from "@/lib/actions/UserActions";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoLink from "./LogoLink";
import { MdMenu, MdClose } from "react-icons/md";

const NavBar = ({ userId }: any) => {
  const [toggleMenu, setToggleMenu] = useState<Boolean>(false);
  const [user, setUser] = useState<any>();
  const navigation = !user
    ? [
        { title: "About us", path: "/about" },
        { title: "Cart", path: "/cart" },
        { title: "History", path: "/order-history" },
      ]
    : [
        {
          title: user?.restaurantId === "" ? "Business" : "Dashboard",
          path:
            user?.restaurantId === "" ? "/restaurant" : "/restaurant/dashboard",
        },
        { title: "About us", path: "/about" },
        { title: "Cart", path: "/cart" },
        { title: "History", path: "/order-history" },
      ];

  const getUser = async () => {
    if (userId) {
      const userdata = await getUserByUserId(userId);
      setUser(userdata);
    } else {
      setUser(undefined);
    }
  };
  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className={`w-full shadow-sm flex flex-col gap-3 px-10 md:px-14 py-5`}>
      <div className="flex items-center justify-between ">
        <div className="flex gap-5 h-full items-center">
          <LogoLink />
          <div className="hidden md:flex gap-4 text-xl text-gray-600">
            {navigation.map((n: any) => (
              <Link href={n.path} className="cursor-pointer hover:text-black">
                {n.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:flex">
          <SignedOut>
            <SignInButton>
              <button className="lg:border lg:px-5 py-2 lg:rounded-md">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              showName={true}
              userProfileMode="modal"
              appearance={{
                elements: {
                  userButtonOuterIdentifier: "text-xl font-normal",
                  userButtonBox: "px-5 py-2 outline-none border-0",
                },
              }}
            />
          </SignedIn>
        </div>
        <div className="flex md:hidden p-2">
          {!toggleMenu && (
            <MdMenu onClick={handleToggle} className="text-2xl" />
          )}
          {toggleMenu && (
            <MdClose onClick={handleToggle} className="text-2xl" />
          )}
        </div>
      </div>
      {toggleMenu && (
        <div className="pl-3 flex flex-col md:hidden gap-4 text-xl text-gray-600">
          {navigation.map((n: any) => (
            <Link href={n.path} onClick={handleToggle} className="cursor-pointer hover:text-black">
              {n.title}
            </Link>
          ))}
          <div className="flex md:hidden">
            <SignedOut>
              <SignInButton>
                <button className="lg:border lg:px-5 py-2 lg:rounded-md">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                showName={true}
                userProfileMode="modal"
                appearance={{
                  elements: {
                    userButtonOuterIdentifier: "text-xl font-normal",
                    userButtonBox: "px-5 py-2 outline-none border-0",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
