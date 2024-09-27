import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { InventoryNavTypes } from "@/types/inventory/types";
import WarningDialog from "./WarningDialog";
import Link from "next/link";

export default function DeskTopInvNav({
  tabs,
  selectedTab,
  setSelectedTab,
}: InventoryNavTypes) {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden sm:flex items-center justify-between">
      <nav aria-label="Tabs" className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setSelectedTab(tab.name)}
            className={`${
              selectedTab === tab.name
                ? "border-secondary text-secondary-dark"
                : "border-transparent text-primary hover:border-neutral-mid hover:text-neutral-dark"
            } whitespace-nowrap border-b-2 px-1 py-4 text-md font-medium`}
          >
            {tab.name}
          </button>
        ))}
        <div className="flex items-center">
          <InformationCircleIcon
            onClick={() => setOpen(true)}
            className="h-5 w-5 text-info cursor-pointer"
          />

          <WarningDialog open={open} setOpen={setOpen} />
        </div>
      </nav>
      <Link
        href="/clothing"
        className="text-accent hover:tex-accent-dark hover:underline text-md"
      >
        Men's Clothing
      </Link>
    </div>
  );
}
