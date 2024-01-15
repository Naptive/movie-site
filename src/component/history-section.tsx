"use client";
import { analytics } from "@/config";
import { logEvent } from "firebase/analytics";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Label from "./label";

function HistorySection() {
  let storedHistoryString;
  let storedHistory: any = [];
  const router = useRouter();

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const storedHistoryString = window.localStorage.getItem("history");
      storedHistory = storedHistoryString
        ? JSON.parse(storedHistoryString)
        : [];
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }

  return storedHistory.length > 0 && (
    <>
      <section
        id="ContinueWatching"
        className="relative -top-7 pl-[12px] bg-black max-w-screen"
      >
        <Label title={"Continue Watching"} />
        <div className="w-min flex gap-[12px] flex-row-reverse h-[334px] overflow-x-scroll overflow-y-hidden no-scrollbar">
          {storedHistory.map((items: any) => (
            <div
              key={items.title}
              className="max-h-[306px] sm:min-w-[150px] sm:max-w-[150px] min-w-[170px] max-w-[170px] relative cursor-pointer"
              onClick={() => {
                logEvent(analytics, "history");
                router.push(
                  `${items.title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}`
                );
              }}
            >
              <h6 className="absolute top-2 left-2 bg-white text-black rounded-md px-2 text-[11px] py-[2px]">
                {items.resolution}
              </h6>
              <Image
                src={`https://image.tmdb.org/t/p/w500${items?.poster}` || ""}
                alt={items?.title}
                width={250}
                height={250}
                className="w-full h-[236px] object-cover rounded-t-xl"
              />
              <div className=" h-[78px] bg-[#131313c2] md:first-letter:bg-[] rounded-b-xl p-3">
                <h1 className="text-[18px] line-clamp-2 md:text-[15px]">
                  {items?.title}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default HistorySection;
