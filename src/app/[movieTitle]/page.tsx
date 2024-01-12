"use client";
import AnimatedTab from "@/component/animated-tab";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "@/config";
import RecommendedSection from "@/component/recommended-section";
import { AnimatePresence, motion } from "framer-motion";
import Label from "@/component/label";

interface Info {
  title: string;
  mainImage: string;
  quality: boolean;
  release: string;
  trailer: any;
  time: string;
  rating: number;
  filmURL: string;
  resolution: string;
  overview: string;
  releaseDate: string;
  genres: any;
  language: string;
  runtime: number;
}

function MoviePage() {
  const [movieInfo, setMovieInfo] = useState<Info | null>();
  const [activeTab, setActiveTab] = useState<string>("myFirstId");
  const [overViewOpen, setOverViewOpen] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const pathName = usePathname();
  const val = pathName.split("/")[1];

  const callToFetch = async () => {
    const docRef = doc(db, "movies", val);
    const docSnap: any = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setMovieInfo(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    callToFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: any) => {
      console.log("Auth state changed in movie page:", authUser);
      setUser(authUser);
    });

    // Clean up the subscription to avoid memory leaks
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = async () => {
      const docRef = doc(db, "accountData", `${auth?.currentUser?.email}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const likedMovies = docSnap.data().likedMovies;
        const isMovieLiked = likedMovies.includes(movieInfo?.title);

        if (isMovieLiked) {
        const button: any = document.getElementById("like");
        button.querySelector("svg").setAttribute("fill", "red");
        button.style.color = 'red'
        }
      }
    };
    unsubscribe();
  });

  const checkIfLiked = async () => {
    const docRef = doc(db, "accountData", `${auth?.currentUser?.email}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const likedMovies = docSnap.data().likedMovies;
      const isMovieLiked = likedMovies.includes(movieInfo?.title);

      if (isMovieLiked) {
        const button: any = document.getElementById("like");
        button.querySelector("svg").setAttribute("fill", "transparent");
        button.style.color = 'white'
        await updateDoc(docRef, {
          likedMovies: arrayRemove(movieInfo?.title),
        }).then(() => console.log("removed from db"));
      } else {
        const button: any = document.getElementById("like");
        button.querySelector("svg").setAttribute("fill", "red");
        button.style.color = 'red'
        await updateDoc(docRef, {
          likedMovies: arrayUnion(movieInfo?.title),
        }).then(() => console.log("added like to database"));
      }
    }
  };

  if (!movieInfo) {
    return (
      <main className=" min-h-screen min-w-screen noselect flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </main>
    );
  }

  return (
    <main className=" min-h-screen noselect relative px-4 pt-[75px]">
      <title>{`William || ${val}`}</title>

      <video
        id="video"
        src={`${movieInfo?.filmURL}`}
        controls
        className="z-20 h-[200px] md:h-[320px] w-full rounded-t-xl bg-[#131313c2]"
      >
        Your browser does not support the video tag.
      </video>

      <h1 className="text-[26px] leading-snug my-4 mx-[12px]">
        {movieInfo.title}
      </h1>

      <button
        id="like"
        onClick={() => checkIfLiked()}
        className="w-[50px] z-30 h-[50px] rounded-xl absolute top-[15px] right-[15px] flex justify-center items-center"
      >
        <Heart/>
      </button>

      <Link href={"/"}>
        <button className="w-[50px] z-30 h-[50px] bg-[#131313c2] rounded-xl absolute top-[15px] left-[15px] flex justify-center items-center">
          <ArrowLeft color="white" />
        </button>
      </Link>

      <AnimatedTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        speed={0.1}
        first={"IMDB"}
        second={"Trailer"}
        third={"More"}
      />
      <AnimatePresence>
        <div className="my-7">
          {activeTab === "myFirstId" && (
            <motion.section
              key={"details"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="m-3"
            >
              <div className="h-[29px] w-min text-[13px] gap-2 flex items-center justify-center">
                <p>
                  {movieInfo.resolution === "720p" && "sd"}
                  {movieInfo.resolution === "1080p" && "hd"}
                  {movieInfo.resolution === "2160p" && "UHD"}
                </p>
                <p>{movieInfo.rating.toFixed(1) || "N/A"}</p>
                <p>{movieInfo.runtime || "N/A"}</p>
              </div>
              <h5
                className={`${
                  overViewOpen === false ? "line-clamp-3" : ""
                } text-[14px] pr-11 text-zinc-400 mb-3 relative`}
              >
                {movieInfo.overview}
                <span
                  onClick={() => setOverViewOpen(!overViewOpen)}
                  className="absolute right-0 bottom-0 text-white"
                >
                  more
                </span>
              </h5>

              <div className="text-zinc-400 text-[14px]">
                <h5>{"Date: " + movieInfo.releaseDate || "N/A"}</h5>
                <h5 className="flex">
                  Genre:
                  {movieInfo.genres.map((genre: any) => (
                    <h5 className="pl-2" key={genre.id}>
                      {genre.name || "N/A"}
                    </h5>
                  ))}
                </h5>
                <h5>{"Rating: " + movieInfo.rating.toFixed(1)}</h5>
                <h5>{`language: "${movieInfo.language || "N/A"}"`}</h5>
              </div>
            </motion.section>
          )}

          {activeTab === "mySecondId" ? (
            <motion.section
              key={"trailer"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="m-3"
            >
               {/* <div dangerouslySetInnerHTML={{ __html: movieInfo?.trailer }}></div> */}
            </motion.section>
          ) : (
            ""
          )}

          {activeTab === "myThirdId" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <Label title="Recomended" />
              <section
                id="Recommended"
                key={"more"}
                className="w-full flex flex-wrap items-center justify-between sm:justify-start gap-3 mt-5"
              >
                <RecommendedSection/>{" "}
              </section>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </main>
  );
}
export default MoviePage;
