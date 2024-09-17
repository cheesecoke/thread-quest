import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Button from "@/app/components/Button";

const statuses = {
  Purchased: "text-success bg-success-light ring-success/20",
  "In progress": "text-neutral-dark bg-neutral-light ring-neutral-mid/20",
  Archived: "text-warning bg-warning-light ring-warning/20",
};

const savedOutfits = [
  {
    id: 1,
    name: "Outfit 1",
    href: "#",
    status: "Purchased",
    dueDate: "March 17, 2023",
    dueDateTime: "2023-03-17T00:00Z",
  },
  {
    id: 2,
    name: "Roark Outfit",
    href: "#",
    status: "In progress",
    dueDate: "May 5, 2023",
    dueDateTime: "2023-05-05T00:00Z",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SavedOutfitsList() {
  return (
    <ul role="list" className="divide-y divide-neutral-mid w-full">
      {savedOutfits.map((project) => (
        <li
          key={project.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-primary">
                {project.name}
              </p>
              <p
                className={classNames(
                  statuses[project.status],
                  "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {project.status}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-neutral-dark">
              <p className="whitespace-nowrap">
                Created on{" "}
                <time dateTime={project.dueDateTime}>{project.dueDate}</time>
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <Button variant="outlined" size="sm" href={project.href}>
              View Outfit<span className="sr-only">, {project.name}</span>
            </Button>
            <Button variant="outlined" size="sm" href="#">
              Buy Outfit<span className="sr-only">, {project.name}</span>
            </Button>
            <Menu as="div" className="relative flex-none">
              <MenuButton className="-m-2.5 block p-2.5 text-primary hover:text-accent">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-white-mid focus:outline-none"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm leading-6 text-primary hover:bg-neutral-mid"
                  >
                    Edit<span className="sr-only">, {project.name}</span>
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm leading-6 text-primary hover:bg-neutral-mid"
                  >
                    Purchased<span className="sr-only">, {project.name}</span>
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm leading-6 text-primary hover:bg-neutral-mid"
                  >
                    Delete<span className="sr-only">, {project.name}</span>
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
}
