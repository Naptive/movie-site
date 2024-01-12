'use client'
import React from "react";
import {Card, CardFooter, Image, Button, CardHeader} from "@nextui-org/react";
import { useRouter } from "next/navigation";
 interface Info {
    img: string,
    title: string,
    sortMemo: string,
    random: any,
    resolution: any,
    rating: any,
    runtime: any
 }

export default function CarouselCard({img, title, sortMemo, resolution, rating, runtime}: Info) {
    const router = useRouter();
  return (
    <Card isFooterBlurred className="min-w-1/3 w-1/3 h-[300px] col-span-12 sm:col-span-7 hidden md:block">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">Movie</p>
        <h4 className="text-white/90 font-medium text-xl">{title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt={title}
        className="z-0 w-full h-full object-cover backdrop:brightness-90"
        src={`https://image.tmdb.org/t/p/w500${img}` || ''}
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <div className="flex flex-col">
            <p className="text-tiny text-white/60 line-clamp-2 pr-2">{sortMemo}</p>
            <div className="h-[29px] w-min text-[13px] gap-2 flex items-center justify-center text-tiny text-white/60">
                <p>
                  {resolution === "720p" && "sd"}
                  {resolution === "1080p" && "hd"}
                  {resolution === "2160p" && "UHD"}
                </p>
                <p>{rating.toFixed(1) || "N/A"}</p>
                <p>{runtime || "N/A"}</p>
              </div>
          </div>
        </div>
        <Button radius="full" size="sm" onPress={() => router.push(
              `${title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}`
            )}>Watch</Button>
      </CardFooter>
    </Card>
  );
}
