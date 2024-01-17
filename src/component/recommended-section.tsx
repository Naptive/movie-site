"use client";
import Image from "next/image";
import { analytics, db } from "../config/index";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { logEvent } from "firebase/analytics";

interface Movie {
  title: string;
  poster: string;
  quality: boolean;
  resolution: string;
  backdrop: string;
  overview: string;
  rating: any;
  runtime: any
}

// interface MapRecommendedProps {
//   setCarousel?: React.Dispatch<React.SetStateAction<Movie[]>>;
// }

function RecommendedSection({ setCarouselData }: any) {
  const router = useRouter();

  const [allData, setAllData] = useState<Movie[]>([]);

  const fetchFilm = async () => {
    const q = query(collection(db, "movies"));

    const querySnapshot = await getDocs(q);
    const data: any = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setAllData(data);
    setCarouselData(data);
    console.log('just set Carousel Data')
    
  }

  useEffect(() => {
    fetchFilm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {allData.map((data) => (
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
            logEvent(analytics, `${data.title}`)
            router.push(
              `${data.title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}`
            );
          }}
          key={data.title}
          className="max-h-[306px] sm:w-[150px] relative line-clamp-2 cursor-pointer w-[48%] "
        >
          <h6
            className={`bg-white absolute top-2 left-2 text-black rounded-md px-2 text-[11px] py-[1px]`}
          >
            {data.resolution}
          </h6>
          <Image
            quality={80}
            src={`https://image.tmdb.org/t/p/w342${data?.poster}` || ''}
            alt={data.title}
            width={250}
            height={250}
            className="min-w-full h-[236px] object-cover rounded-t-xl"
          />
          <div className="bg-[#131313c2] rounded-b-xl p-3 py-3 min-h-[78px]">
            <h1 className="text-[18px] line-clamp-2  md:text-[15px]">{data.title || "N/A"}</h1>
          </div>
        </div>
      ))}
    </>
  );
}

export default RecommendedSection;
