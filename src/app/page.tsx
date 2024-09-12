import NavBar from "./components/NavBar";
import Link from "next/link";
import Image from "next/image";
import Button from "@/app/components/Button";
import content from "@/config/content";

const pages = [
  {
    name: "Men's Clothing",
    description: "Explore our latest clothing collections.",
    url: "/clothing",
  },
];

export default function Home() {
  return (
    <div className="bg-secondary">
      {/* <header className="absolute inset-x-0 top-0 z-50">
        <NavBar />
      </header> */}
      {/* Hero Section */}
      {/* <main> */}
      <div className="relative isolate">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-neutral-light [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        >
          <defs>
            <pattern
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
        <div
          aria-hidden="true"
          className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        >
          <div
            style={{
              clipPath:
                "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
            }}
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-primary to-accent opacity-30"
          />
        </div>
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
                  {content.hero.title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-text-secondary sm:max-w-md lg:max-w-none">
                  {content.hero.subtitle}
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Button href="/clothing">Shop</Button>
                  <Link
                    href="/clothing"
                    className="text-sm font-semibold leading-6 text-primary"
                  >
                    Men's Clothing <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                {/* Images in the hero section */}
                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                  <div className="relative">
                    <Image
                      width={176}
                      height={264}
                      alt="Roark Running Shorts"
                      src="/images/pass_shirt.png"
                      className="aspect-[2/3] w-full rounded-xl bg-neutral-light object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-mid" />
                  </div>
                </div>
                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                  <div className="relative">
                    <Image
                      width={176}
                      height={264}
                      alt="Roark Short Sleeve Button-Up"
                      src="/images/roark_shirt.png"
                      className="aspect-[2/3] w-full rounded-xl bg-neutral-light object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-mid" />
                  </div>
                  <div className="relative">
                    <Image
                      width={176}
                      height={264}
                      alt=""
                      src="/images/roark_pant.png"
                      className="aspect-[2/3] w-full rounded-xl bg-neutral-light object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-mid" />
                  </div>
                </div>
                <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                  <div className="relative">
                    <Image
                      width={176}
                      height={264}
                      alt="Roark T-shirt"
                      src="/images/pass_shorts.png"
                      className="aspect-[2/3] w-full rounded-xl bg-neutral-light object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-mid" />
                  </div>
                  <div className="relative">
                    <Image
                      width={176}
                      height={264}
                      alt=""
                      src="/images/roark_hat.png"
                      className="aspect-[2/3] w-full rounded-xl bg-neutral-light object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-mid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <ul
          role="list"
          className={`${
            pages.length === 1
              ? "flex w-full justify-center"
              : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          }
            ${pages.length === 2 ? "lg:grid-cols-2" : ""}`}
        >
          {pages.map((page) => (
            <li
              key={page.name}
              className="col-span-1 divide-y divide-neutral-mid rounded-lg bg-secondary shadow"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-semibold text-primary">
                      {page.name}
                    </h3>
                  </div>
                  <p className="mt-1 truncate text-sm text-text-secondary">
                    {page.description}
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-neutral-mid">
                  <div className="flex w-0 flex-1">
                    <Link
                      href={page.url}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-primary hover:text-accent"
                    >
                      Shop &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* </main> */}
    </div>
  );
}
