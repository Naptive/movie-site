"use client";
import { Button, Spacer } from "@nextui-org/react";
import { ArrowLeft, Search, Space, UploadCloud, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Nav() {
  const router = useRouter();
  const path: string = usePathname();

  if (path === "/index/search") {
    return null;
  }

  return (
    <header className="md:fixed absolute top-0 z-40 left-0 right-0 px-[22px] md:px-7 py-2 md:py-3 bg-transparent md:bg-black/60 md:backdrop-blur md:backdrop-saturate-150 ">
      <nav className="w-full h-full flex items-center justify-between gap-3 dark">
        {path === "/watch/home" ? (
          <h1
            onClick={() => router.refresh()}
            className="hidden md:block text-xl cursor-pointer"
          >
            William
          </h1>
        ) : (
          path !== "/index/search" && path !== "/watch/home" && (
            <button
              aria-label="Back button"
              onClick={() => router.back()}
              className="w-[50px] z-20 h-[50px] md:w-[40px] md:h-[40px] bg-default-100 dark rounded-xl flex justify-center items-center"
            >
              <ArrowLeft />
            </button>
          )
        )}

        <Spacer />
        <div className="flex gap-3">
            {" "}
            <button
              aria-label="Go to upload any film page"
              onClick={() => router.push("/upload-any-film/manage")}
              className="w-[50px] z-20 h-[50px] md:w-[40px] md:h-[40px] bg-default-100 dark rounded-xl flex justify-center items-center"
            >
              <UploadCloud className="md:text-xl text-2xl" />
            </button>
            <button
              aria-label="Go to search page"
              onClick={() => router.push("/index/search")}
              className="w-[50px] z-20 h-[50px] md:w-[40px] md:h-[40px] bg-default-100 dark rounded-xl flex justify-center items-center"
            >
              <Search className="md:text-xl text-2xl" />
            </button>
          </div>
      </nav>
    </header>
  );
}

export default Nav;
