"use client";

import { motion } from "framer-motion";

interface FilterProp {
  speed: number;
  first: string;
  second: string;
  third: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function AnimatedTab({
  speed,
  first,
  second,
  third,
  activeTab,
  setActiveTab,
}: FilterProp) {

  
  let tabs = [
    { id: "myFirstId", label: first },
    { id: "mySecondId", label: second },
    { id: "myThirdId", label: third },
  ];


  return (
    <section className="h-12 md:w-[300px] flex items-center justify-between mx-[12px] px-2 rounded-lg bg-[#131313c2] relative z-0 border border-[#060606]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
        onClick={() => setActiveTab(tab.id)}
          className={`relative text-white w-1/3 h-[80%] flex items-center justify-center`}
        >
          <span className="relative z-20 mix-blend-exclusion">{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-pill"
              transition={{ type: "spring", duration: speed }}
              style={{ borderRadius: 6 }}
              className="bg-white h-full w-full absolute top-0"
            />
          )}
        </button>
      ))}
    </section>
  );
}
export default AnimatedTab;
