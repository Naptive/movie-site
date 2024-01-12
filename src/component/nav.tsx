"use client";
import { ArrowLeft, Search, UploadCloud, User, UserRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Nav() {
  const router = useRouter();
  const path = usePathname();

  const getWindowWidth = (): boolean => {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.innerWidth > 770;
    } else {
      return false;
    }
  };

  const windowWidth: boolean = getWindowWidth();

  if (path === "/search") {
    return null;
  }

  return windowWidth ? (
    <header className="fixed top-0 z-40 left-0 right-0 h-[54px] px-7 bg-black">
      <nav className="w-full h-full flex items-center justify-start">
        {path === "/" ? (
          <h1 className="text-[20px] font-medium">William</h1>
        ) : (
          <>
            <button
              onClick={() => router.back()}
              className="z-30 w-[40px] h-[40px] bg-white rounded-xl flex justify-center items-center"
            >
              <ArrowLeft color="black" size={windowWidth ? "20px" : "24px"} />
            </button>
          </>
        )}

        <div className="absolute z-30 top-[15px] md:top-[7px] md:right-[28px] right-[15px] gap-3 flex">
          <button
            onClick={() => router.push("upload-any-film")}
            className="w-[50px] z-20 h-[50px] md:w-[40px] md:h-[40px] bg-white rounded-xl flex justify-center items-center"
          >
            <UploadCloud color="black" size={windowWidth ? "20px" : "24px"} />
          </button>

          <button
            onClick={() => router.push("search")}
            className="w-[50px] z-20 h-[50px] md:w-[40px] md:h-[40px] bg-white rounded-xl flex justify-center items-center"
          >
            <Search color="black" size={windowWidth ? "20px" : "24px"} />
          </button>

          <button
            onClick={() => router.push("account")}
            className="w-[50px] z-20 h-[50px] md:w-[40px] md:h-[40px] bg-white rounded-xl flex justify-center items-center"
          >
            <User color="black" size={windowWidth ? "20px" : "24px"} />
          </button>
        </div>
      </nav>
    </header>
  ) : null;
}

export default Nav;
