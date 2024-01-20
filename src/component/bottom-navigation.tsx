"use client";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function BottomNav() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const path = usePathname();
  const router = useRouter();

  let tabs = [
    { id: "/watch/home", label: <Home /> },
    { id: "/index/search", label:  <Search/> },
  ];

 useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop < lastScrollTop) {
        // Scrolling up
        setIsNavVisible(true);
      } else if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        // Scrolling down
        setIsNavVisible(false);
      }

      // Update lastScrollTop but not on every scroll event to avoid unnecessary re-renders,
      // hence not including it in the dependency array of the useEffect
      setLastScrollTop(currentScrollTop);
    };

    // Throttle scroll updates to avoid performance issues
    let isThrottled = false;
    const throttledScroll = () => {
      if (!isThrottled) {
        handleScroll();
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttledScroll);

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [lastScrollTop]);

  return (
    <div
      className={`${
        path === "/watch/home" ? 'block': path === "/index/search" ? 'block' : 'hidden'
      } fixed w-full flex items-center animate-all duration-500 justify-center md:hidden ${
        isNavVisible ? "animate-show" : "animate-hide"
      }`}
      style={{ bottom: isNavVisible ? "0.5rem" : "-5rem" }}
    >
      <section className="h-[48px] md:w-[400px] flex items-center justify-between mx-[12px] px-2 rounded-lg bg-[#131313] w-[80%] overflow-hidden z-30">
        {tabs.map((tab) => (
          <button
            aria-label={`Go to ${tab.id === '/watch/home' ? 'home' : 'index/search'}`}
            key={tab.id}
            onClick={(e) => {
              e.preventDefault();
              path === "/watch/home" && router.push("/index/search");
              path === "/index/search" && router.push("/watch/home");
            }}
            className={`w-1/2 relative text-white h-[80%] flex items-center justify-center`}
          >
            <span className="relative z-20 mix-blend-exclusion">
              {tab.label}
            </span>
            {path === tab.id && (
              <motion.div
                layoutId={`Web-${tab.id}`}
                transition={{ type: "spring", duration: 0.5 }}
                style={{ borderRadius: 6 }}
                className="bg-white h-full w-full absolute top-0"
              />
            )}
          </button>
        ))}
      </section>
    </div>
  );
}
export default BottomNav;
