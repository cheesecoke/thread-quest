import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-primary p-4 fixed top-0 w-full z-50 shadow-md flex justify-around">
      <div className="container mx-auto flex justify-between items-center max-w-2xl lg:max-w-7xl">
        <Link href="/" className="text-accent font-logo text-xl font-semibold">
          Thread-Quest
        </Link>

        <div>
          <div className="absolute rounded-full bg-secondary shadow-md top-4 p-1">
            <Image
              src="/images/logo.png"
              alt="ThreadQuest Logo"
              width={80}
              height={80}
            />
          </div>
        </div>

        <div className="relative">
          <Button variant="outlined" href="/clothing">
            Men's Clothing
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
