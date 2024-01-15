"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import CarouselCard from "./carousel-card";
import { useRouter } from "next/navigation";

function OverviewCarousel({ carousel }: any) {
  const [secondRandomMovie, setSecondRandomMovie] = useState<any>(null);


  const router = useRouter();

 
  useEffect(() => {
    // Function to select a random movie
    function selectRandomMovie() {
      return carousel[Math.floor(Math.random() * carousel.length)];
    }

    setSecondRandomMovie(selectRandomMovie());

    // Set up the interval
    const intervalId = setInterval(() => {
      setSecondRandomMovie(selectRandomMovie());
    }, 15000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [carousel]);
  const slicedData = carousel.slice(0, 3);
  return (
    <section className="flex dark gap-5 md:my-20 relative">
      <div className="relative overflow-hidden md:w-1/3 w-full md:rounded-xl md:hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${secondRandomMovie?.backdrop}` || ''}
          alt={secondRandomMovie?.title}
          width={2000}
          height={2000}
          className=" object-cover shadow-inner shadow-black w-full h-[300px]"
        />

        <div className="w-full absolute top-0 h-[300px] bg-gradient-to-t from-5% from-black to-transparent"></div>
        <div className="bg-white rounded-2xl bg-opacity-5 h-[29px] w-min px-4 text-[13px] gap-2 flex items-center justify-center absolute bottom-8 right-[23px] backdrop-blur-md">
          <p>
            {secondRandomMovie?.resolution}
          </p>
          <p>{secondRandomMovie?.rating?.toFixed(1) || "N/A"}</p>
          <p>{secondRandomMovie?.runtime || "N/A"}</p>
        </div>
        <section className="flex justify-between w-full absolute bottom-[80px] px-[22px] items-end">
          <h1 className="text-[25px] leading-snug mr-5">
            {secondRandomMovie?.title}
          </h1>
            <button className=" transition-all border border-white hover:bg-white hover:text-black rounded-md py-2 px-5" onClick={() => router.push(
              `${secondRandomMovie?.title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}`
            )}>
              Watch
            </button>
        </section>
      </div>
      {slicedData.map((randomize: any) => (
        <CarouselCard
          key={randomize?.rating}
          title={randomize?.title}
          sortMemo={randomize?.overview}
          random={carousel}
          resolution={randomize?.resolution}
          rating={randomize?.rating}
          runtime={randomize?.runtime}
          backdrop={randomize?.backdrop}
        />
      ))}
    </section>
  );
}
export default OverviewCarousel;
