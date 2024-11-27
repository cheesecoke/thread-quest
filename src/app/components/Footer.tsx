"use client";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();
  const navigation = {
    main: [
      { name: "Home", href: "/" },
      { name: "Men's Clothing", href: "/clothing" },
      session && { name: "Inventory", href: "/inventory" },
      { name: "Privacy Policy", href: "/privacy-policy" },
    ].filter(Boolean),
  };
  return (
    <footer className="relative z-2 bg-neutral-light">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        >
          {navigation.main.map(
            (item) =>
              item && (
                <div key={item.name} className="pb-6">
                  <a
                    href={item.href}
                    className="text-sm font-body text-text-white hover:text-primary"
                  >
                    {item.name}
                  </a>
                </div>
              )
          )}
        </nav>
        <p className="mt-10 text-center text-xs font-body text-text-white">
          &copy; {new Date().getFullYear()} Thread-Quest, Inc. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
