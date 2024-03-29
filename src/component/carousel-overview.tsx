"use client";
import { useState } from "react";
import { Image } from "@nextui-org/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const CarouselCard = dynamic(() => import("@/component/carousel-card"));

function CarouselOverview({ allData }: any) {
  const [secondRandomMovie, setSecondRandomMovie] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    const maxIndex = allData?.length - 1;

    function selectRandomMovie() {
      return allData[Math.floor(Math.random() * (maxIndex + 1))];
    }

    setSecondRandomMovie(selectRandomMovie());

    const intervalId = setInterval(() => {
      setSecondRandomMovie(selectRandomMovie());
    }, 15000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [allData]);

  let firstThreeElements = allData?.slice(1, 4);

  return (
    <section className="flex dark gap-5 md:my-20 relative md:min-h-[300px]">
      <div className="relative overflow-hidden md:w-1/3 w-full md:rounded-xl md:hidden">
        <Image
          src={
            secondRandomMovie?.backdrop !== undefined
              ? `https://image.tmdb.org/t/p/w780${secondRandomMovie?.backdrop}`
              : ""
          }
          alt={secondRandomMovie?.title}
          radius="none"
          loading="eager"
          width={400}
          height={400}
          className=" object-cover z-0 shadow-inner shadow-black w-full h-[300px]"
        />

        <div className="w-full absolute top-0 h-[300px] bg-gradient-to-t from-5% from-black to-transparent"></div>
        <div className="bg-white rounded-2xl bg-opacity-5 h-[29px] w-min px-4 text-[13px] gap-2 flex items-center justify-center absolute bottom-8 right-[23px] backdrop-blur-md">
          <p>{secondRandomMovie?.resolution}</p>
          <p>{secondRandomMovie?.rating?.toFixed(1) || "N/A"}</p>
          <p>{secondRandomMovie?.runtime || "N/A"}</p>
        </div>
        <section className="flex justify-between w-full absolute bottom-[80px] px-[22px] items-end">
          <h1 className="text-[25px] leading-snug mr-5">
            {secondRandomMovie?.title}
          </h1>
          <button
            className=" transition-all border border-white hover:bg-white hover:text-black rounded-md py-2 px-5"
            onClick={() =>
              router.push(
                `${secondRandomMovie?.title
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-")}`
              )
            }
          >
            Watch
          </button>
        </section>
      </div>
      {firstThreeElements?.map((randomize: any) => (
        <CarouselCard
          key={randomize?.rating}
          title={randomize?.title}
          sortMemo={randomize?.overview}
          random={allData}
          resolution={randomize?.resolution}
          rating={randomize?.rating}
          runtime={randomize?.runtime}
          backdrop={randomize?.backdrop}
        />
      ))}
    </section>
  );
}

export default CarouselOverview;
