"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";


function RecommendedSection({ allData }: any) {
  const router = useRouter();

  return (
    <>
      {allData.map((data: any) => (
        <div
          onClick={() => {
            if (typeof window !== "undefined" && window.localStorage) {
              const storedHistory = window.localStorage.getItem("history");
              const history = storedHistory ? JSON.parse(storedHistory) : [];

              if (
                !history.some(
                  (item: { title: string }) => item.title === data.title
                )
              ) {
                history.push(data);
                window.localStorage.setItem("history", JSON.stringify(history));
              }
            }
            
            router.push(
              `${data.title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}`
            );
          }}
          key={data.title}
          className="max-h-[306px] sm:w-[150px] relative line-clamp-2 cursor-pointer w-[48%] "
        >
          <span
            className={`bg-white absolute top-2 left-2 text-black rounded-md px-2 text-[11px] py-[1px]`}
          >
            {data.resolution}
          </span>
          <Image
            quality={80}
            src={`https://image.tmdb.org/t/p/w342${data?.poster}` || ""}
            alt={data.title}
            width={250}
            height={250}
            className="min-w-full h-[236px] object-cover rounded-t-xl"
          />
          <div className="bg-[#131313c2] rounded-b-xl p-3 py-3 min-h-[78px]">
            <h1 className="text-[18px] line-clamp-2  md:text-[15px]">
              {data.title || "N/A"}
            </h1>
          </div>
        </div>
      ))}
    </>
  );
}

export default RecommendedSection;
