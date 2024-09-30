"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, ArrowLeftIcon } from "@heroicons/react/20/solid";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Men's Clothing", href: "/clothing" },
  { name: "Inventory", href: "/inventory" },
];

const NavBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const activeLink = navLinks.find((link) => link.href === pathname);
  const viewingAlt = pathname
    .replace(/^\/|-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  console.log(pathname);

  return (
    <nav className="bg-white fixed top-0 w-full z-50 flex justify-around border-b border-neutral-mid px-6 h-16">
      <div className="container mx-auto flex justify-between items-center max-w-2xl lg:max-w-7xl">
        <div className="flex justify-start items-center">
          <Image
            src="/images/logo.png"
            alt="ThreadQuest Logo"
            width={65}
            height={65}
            className="hidden sm:flex"
            loading="lazy"
          />
          <Link
            href="/"
            className="hidden sm:flex text-accent font-logo text-md md:text-lg font-semibold"
          >
            Thread-Quest
          </Link>
          <button
            onClick={() => router.back()} // Trigger back navigation
            className="flex sm:hidden items-center space-x-2 py-2 bg-transparent text-primary hover:text-secondary transition duration-150 ease-in-out"
          >
            <ArrowLeftIcon className="h-6 w-6" /> {/* Heroicon arrow */}
            <span>Back</span> {/* Optional text */}
          </button>
        </div>

        <div className="relative flex justify-between items-center space-x-2">
          <div className="text-neutral-mid text-sm md:text-md mr-4 transition duration-300 ease-in-out">
            Viewing{" "}
            <span className="text-secondary-dark">
              <i>{activeLink?.name ? activeLink?.name : viewingAlt}</i>
            </span>
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="flex items-center rounded-full text-text-primary hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
                <span className="sr-only">Open options</span>
                <Bars3Icon aria-hidden="true" className="h-5 w-5" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-primary ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {navLinks.map((link) => (
                  <MenuItem key={link.name}>
                    <Link
                      href={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      {link.name}
                    </Link>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
