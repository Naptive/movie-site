"use client";
import { PlayCircle, Search, UploadCloud, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CarouselCard from "./carousel-card";

function OverviewCarousel({ carousel }: any) {
  const [randomMovie, setRandomMovie] = useState<any>(null);
  const [secondRandomMovie, setSecondRandomMovie] = useState<any>(null);
  const router = useRouter();

  const WindowWidth: any = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    } else {
      return null;
    }
  };

  useEffect(() => {
    // Function to select a random movie
    function selectRandomMovie() {
      return carousel[Math.floor(Math.random() * carousel.length)];
    }

    // Initial selection when the component mounts
    setRandomMovie(selectRandomMovie());
    setSecondRandomMovie(selectRandomMovie());

    // Set up the interval
    const intervalId = setInterval(() => {
      setRandomMovie(selectRandomMovie());
      setSecondRandomMovie(selectRandomMovie());
    }, 15000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [carousel]);

  return (
    <section className="flex dark gap-5 md:my-20 relative">
      <div className="absolute z-30 top-[15px] right-[15px] gap-3 flex md:hidden">
        <button
          onClick={() => router.push("upload-any-film")}
          className="w-[50px] z-20 h-[50px] bg-white rounded-xl flex justify-center items-center"
        >
          <UploadCloud color="black" />
        </button>

        <button
          onClick={() => router.push("search")}
          className="w-[50px] z-20 h-[50px] bg-white rounded-xl flex justify-center items-center"
        >
          <Search color="black" />
        </button>

        <button
          onClick={() => router.push("account")}
          className="w-[50px] z-20 h-[50px] bg-white rounded-xl flex justify-center items-center"
        >
          <User color="black" />
        </button>
      </div>
      <div className="relative overflow-hidden md:w-1/3 w-full md:rounded-xl md:hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${secondRandomMovie?.poster}` || ''}
          alt={secondRandomMovie?.title}
          width={2000}
          height={2000}
          placeholder="blur"
          blurDataURL={`https://image.tmdb.org/t/p/w10${secondRandomMovie?.poster}` || ''}
          className=" object-cover shadow-inner shadow-black w-full h-[300px]"
        />

        <div className="w-full absolute top-0 h-[300px] bg-gradient-to-t from-5% from-black to-transparent"></div>
        <div className="bg-white rounded-2xl bg-opacity-5 h-[29px] w-min px-4 text-[13px] gap-2 flex items-center justify-center absolute bottom-8 right-[23px] backdrop-blur-md">
          <p>
            {secondRandomMovie?.resolution === "720p" && "sd"}
            {secondRandomMovie?.resolution === "1080p" && "hd"}
            {secondRandomMovie?.resolution === "2160p" ? "UHD" : "N/A"}
          </p>
          <p>{secondRandomMovie?.rating?.toFixed(1) || "N/A"}</p>
          <p>{secondRandomMovie?.runtime || "N/A"}</p>
        </div>
        <section className="flex justify-between w-full absolute bottom-[80px] px-[22px] items-center">
          <h1 className="text-[25px] leading-snug mr-5">
            {secondRandomMovie?.title}
          </h1>
          {WindowWidth <= 500 ? (
            <PlayCircle
              size={50}
              strokeWidth={1}
              className="min-w-[50px] min-h-[50px]"
            />
          ) : (
            <button className=" transition-all border border-white hover:bg-white hover:text-black rounded-md py-2 px-5">
              Watch
            </button>
          )}
        </section>
      </div>
      {carousel.map((randomize: any) => (
        <CarouselCard
          key={randomize?.rating}
          img={randomize?.poster}
          title={randomize?.title}
          sortMemo={randomize?.overview}
          random={carousel}
          resolution={randomize?.resolution}
          rating={randomize?.rating}
          runtime={randomize?.runtime}
        />
      ))}
    </section>
  );
}
export default OverviewCarousel;
