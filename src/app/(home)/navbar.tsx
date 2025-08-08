import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { UserButton } from "@clerk/nextjs";
import { Suspense } from "react";

export const Navbar = () => {
  return (
    <nav className=" flex items-center justify-between h-fulll w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <Suspense>
        <SearchInput />
      </Suspense>
      <UserButton />
    </nav>
  );
};
