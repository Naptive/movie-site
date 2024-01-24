"use client";
import Label from "@/component/label";
import AnimatedTab from "@/component/animated-tab";
import { useEffect, useState } from "react";
import CarouselOverview from "@/component/carousel-overview";
import dynamic from "next/dynamic";
import { db } from "@/config";
import { collection, getDocs, query } from "firebase/firestore";
import RecommendedSection from "@/component/recommended-section";
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
  let storedHistoryString;
  let storedHistory: any = [];

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const storedHistoryString = window.localStorage.getItem("history");
      storedHistory = storedHistoryString
        ? JSON.parse(storedHistoryString)
        : [];
        storedHistory.reverse();
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }

  const fetchFilm = async () => {
    // Check if data is already in session storage
    const storedData = sessionStorage.getItem('films');
    if (storedData) {
        // Parse the stored data and set it
        const data = JSON.parse(storedData);
        setAllData(data);
        console.log('Data loaded from session storage');
        return;
    }

    const q = query(collection(db, "movies"));
    const querySnapshot = await getDocs(q);

    const data: any = await Promise.all(querySnapshot.docs.map(doc => doc.data()));

    // Store the fetched data in session storage
    sessionStorage.setItem('films', JSON.stringify(data));

    setAllData(data);
    console.log('Fetched data and set in session storage');
}

  useEffect(() => {
    fetchFilm();
  }, []);
 
  return (
    <main className="min-h-screen overflow-x-hidden pb-20 md:px-7">
      <title>WilliamFlix.com || Latest For You</title>
      <CarouselOverview allData={allData}/>

      <section className="px-3">
      <Label title={"Continue Watching"} chevron={false} />

        <section
          id="Recommended"
          className="w-full flex flex-wrap items-center justify-between sm:justify-start gap-3 mt-5"
        >
          <RecommendedSection allData={storedHistory} />
        </section>
      </section>
      

      <section className="px-3">
        <section className="md:flex justify-start items-center gap-5">
          <Label title={"Recommended"} chevron={false} />
          <AnimatedTab
            speed={0.1}
            first={"Movies"}
            second={"Series"}
            third={"Filter"}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </section>

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
