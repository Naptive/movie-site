"use client";
import { ArrowLeft,  SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Search() {
  const [search, setSearch] = useState('')
  const router = useRouter();

  return (
    <main className="min-h-screen">
      <header className="fixed justify-between top-[0px] w-full p-4 flex items-center gap-3 bg-black">
        <button
          onClick={() => router.back()}
          className="z-30 w-[50px] h-[50px] md:w-[40px] md:h-[40px] bg-white rounded-xl flex justify-center items-center"
        >
          <ArrowLeft color="black" />
        </button>

        
        <div className="flex items-center flex-1 min-h-[50px] px-4 gap-4 min-w-min rounded-xl bg-[#131313]">
        <SearchIcon color='#838383' size={20}/>
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="py-3 w-[80%] h-full bg-inherit focus:outline-none text-[#838383] placeholder:text-[#838383]"
          />
        </div>
        <button
          onClick={() => router.back()}
          className="z-30 w-[50px] h-[50px] md:w-[40px] md:h-[40px] bg-[#131313] rounded-xl flex justify-center items-center"
        >
          <SearchIcon color="white" />
        </button>
      
      </header>
    </main>
  );
}

export default Search;
