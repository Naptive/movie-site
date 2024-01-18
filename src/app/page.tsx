"use client";
import Label from "@/component/label";
import AnimatedTab from "@/component/animated-tab";
import { useEffect, useState } from "react";
import CarouselOverview from "@/component/carousel-overview";
import dynamic from "next/dynamic";
import { db } from "@/config";
import { collection, getDocs, query } from "firebase/firestore";
const HistorySection = dynamic(() => import('@/component/history-section'))
const RecommendedSection = dynamic(() => import('@/component/recommended-section'))
interface Movie {
  title: string;
  poster: string;
  quality: boolean;
  resolution: string;
  backdrop: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("myFirstId");
  const [allData, setAllData] = useState<Movie[]>([]);

  const fetchFilm = async () => {
    const q = query(collection(db, "movies"));
    const querySnapshot = await getDocs(q);

    const data: any = await Promise.all(querySnapshot.docs.map(doc => doc.data()));

    setAllData(data);
    console.log('just set Carousel Data');
  }

  useEffect(() => {
    fetchFilm();
  }, []);
 
  return (
    <main className="min-h-screen overflow-x-hidden pb-20 md:px-7">
      <title>William || Latest For You</title>
      <CarouselOverview allData={allData}/>

      <HistorySection />

      <section className="px-3">
        <div className="md:flex justify-start items-center gap-5">
          <Label title={"Recommended"} chevron={false} />
          <AnimatedTab
            speed={0.1}
            first={"Movies"}
            second={"Series"}
            third={"Filter"}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <section
          id="Recommended"
          className="w-full flex flex-wrap items-center justify-between sm:justify-start gap-3 mt-5"
        >
          <RecommendedSection allData={allData} />
        </section>
      </section>
    </main>
  );
}
