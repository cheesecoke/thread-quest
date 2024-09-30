import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import type { SavedItemMenuPropsTypes } from "@/types/inventory/types";
import Button from "@/app/components/Button";

export default function SavedItemMenu({
  editOutfit,
  saveEditedName,
  handlePurchaseStatus,
  handleViewOutfit,
  handleEditOutfit,
  handleDeleteOutfit,
  outfit,
}: SavedItemMenuPropsTypes) {
  return (
    <>
      {editOutfit === outfit.id ? (
        <>
          <Button
            href="#"
            variant="outlined"
            size="sm"
            onClick={() => handlePurchaseStatus(outfit.id)}
          >
            Status<span className="sr-only">, {outfit.name}</span>
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => saveEditedName(outfit.id)}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => handleViewOutfit(outfit.items, outfit.id)}
            variant="outlined"
            size="sm"
          >
            View Outfit
          </Button>
        </>
      )}
      <Menu as="div" className="relative flex-none">
        <MenuButton className="-m-2.5 block p-2.5 text-primary hover:text-accent">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-neutral-mid focus:outline-none transition ease-in-out duration-200"
        >
          <MenuItem>
            <a
              href="#"
              onClick={() => handleEditOutfit(outfit.id, outfit.name)}
              className="block px-3 py-1 text-sm leading-6 text-primary hover:bg-neutral-mid transition ease-in-out duration-200"
            >
              Edit
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              onClick={() => handleDeleteOutfit(outfit.id)}
              className="block px-3 py-1 text-sm leading-6 text-primary hover:bg-neutral-mid transition ease-in-out duration-200"
            >
              Delete<span className="sr-only">, {outfit.name}</span>
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
}
