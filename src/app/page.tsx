"use client";
import OverviewCarousel from "@/component/overview-carousel";
import HistorySection from "@/component/history-section";
import RecommendedSection from "@/component/recommended-section";
import Label from "@/component/label";
import AnimatedTab from "@/component/animated-tab";
import { useState } from "react";

interface Movie {
  title: string;
  poster: string;
  quality: boolean;
  resolution: string;
  backdrop: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("myFirstId");
  const [carousel, setCarousel] = useState<Movie[]>([]);

  const item: any = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 770;
    } else {
      return false;
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden pb-20 md:px-7">
      <title>Wiliam || Latest For You</title>
      <OverviewCarousel carousel={carousel} />

      {item && (
        <section
          id="ContinueWatching"
          className="relative -top-7 pl-[12px] bg-black max-w-screen"
        >
          <Label title={"Continue Watching"} />
          <div className="w-full flex gap-[12px] h-[334px] overflow-x-scroll overflow-y-hidden no-scrollbar">
            <HistorySection />
          </div>
        </section>
      )}

      <section className="px-[12px]">
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
          <RecommendedSection setCarousel={setCarousel} />
        </section>
      </section>
    </main>
  );
}
