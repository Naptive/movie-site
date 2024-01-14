"use client";
import {
  AlertCircle,
  Bookmark,
  Download,
  MessageSquareMore,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
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
import Label from "@/component/label";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";

interface Info {
  title: string;
  backdrop: string;
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
  poster: string;
}

function MoviePage() {
  const [movieInfo, setMovieInfo] = useState<Info | null>();
  const [readMore, setReadMore] = useState(false);
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
    const unsubscribe = async () => {
      const docRef = doc(db, "accountData", `${auth?.currentUser?.email}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const likedMovies = docSnap.data().likedMovies;
        const isMovieLiked = likedMovies.includes(movieInfo?.title);

        if (isMovieLiked) {
          const button: any = document.getElementById("like");
          button.querySelector("svg").setAttribute("fill", "red");
          button.style.color = "red";
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
        button.style.color = "white";
        await updateDoc(docRef, {
          likedMovies: arrayRemove(movieInfo?.title),
        }).then(() => console.log("removed from db"));
      } else {
        const button: any = document.getElementById("like");
        button.querySelector("svg").setAttribute("fill", "red");
        button.style.color = "red";
        await updateDoc(docRef, {
          likedMovies: arrayUnion(movieInfo?.title),
        }).then(() => console.log("added like to database"));
      }
    }
  };

  if (!movieInfo) {
    return (<div></div>);
  }

  const dat = [
    {
      id: 0,
      title: "ep1",
    },
    {
      id: 2,
      title: "ep2",
    },
    {
      id: 3,
      title: "ep3",
    },
    {
      id: 4,
      title: "ep4",
    },
    {
      id: 5,
      title: "ep5",
    },
  ];

  return (
    <main className="min-h-screen flex relative pb-4 pt-[75px] gap-3 px-3 md:px-8">
      <title>{`William || ${val}`}</title>

      <aside className="w-full flex flex-col md:flex-1">
        <Card className="py-4 dark px-3 md:h-[78vh]">
          <video
            poster={
              `https://image.tmdb.org/t/p/original${movieInfo?.backdrop}` || ""
            }
            id="video"
            src={`${movieInfo?.filmURL}`}
            controls
            className="z-20 h-[200px] md:h-full w-full rounded-xl bg-black"
          >
            Your browser does not support the video tag.
          </video>
        </Card>
        <Card className="bg-default-100 dark px-5 w-full md:w-min justify-evenly md:justify-start py-3 mt-3 flex gap-5 flex-row ">
        <button
          id="like"
          onClick={() => checkIfLiked()}
          className="w-min h-min"
        >
          <ThumbsUp size={20}/>
        </button>

        <button
          id="dislike"
          onClick={() => {}}
          className="w-min h-min"
        >
          <ThumbsDown size={20}/>
        </button>

        <button
          id="bookmark"
          onClick={() => {}}
          className="w-min h-min"
        >
          <Bookmark size={20}/>
        </button>

        <button
          id="download"
          onClick={() => {}}
          className="w-min h-min"
        >
          <Download size={20}/>
        </button>

        <button
          id="Share"
          onClick={() => {}}
          className="w-min h-min"
        >
          <Share2 size={20}/>
        </button>

        </Card>

        <div className="flex w-full flex-col dark mt-3">
          <Tabs aria-label="Options">
            <Tab
              key="ep"
              title={`${movieInfo.runtime < 60 ? "Episodes" : "Overview"}`}
            >
              <Card style={{ maxWidth: "max-content" }}>
                <CardBody >
                  {movieInfo.runtime < 60 ? (
                    <section className="flex flex-wrap gap-3">
                      {dat.map((item) => (
                        <Card style={{ minWidth: "300px" }} key={item.id}>
                          <CardBody>
                            <p>{item.title}</p>
                          </CardBody>
                        </Card>
                      ))}
                    </section>
                  ) : (
                    <>
                      <h4 className={`${!readMore && 'line-clamp-2'} text-default-500 relative pr-10 text-[14px]`}>{movieInfo.overview}<span onClick={() => setReadMore(!readMore)} className=" absolute bottom-0 right-0 cursor-pointer">{readMore ? 'less' : 'more'}</span></h4>
                      <h5 className="text-xs text-default-500 flex gap-2 pt-5 pr-10">
                        <AlertCircle className="min-w-3 min-h-3"/> If you are the copyright holder of any
                        content and wish to have it removed, please contact us
                        at 10virtus20@gmail.com. We will promptly remove any
                        infringing materials upon proper notice.
                      </h5>
                    </>
                  )}
                </CardBody>
              </Card>
            </Tab>
            <Tab key="trailer" title="Trailer">
              <Card style={{ maxWidth: "max-content" }}>
                <CardBody>
                  <div
                    className="md:max-w-[300px] w-full max-h-[200px] rounded-xl overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: movieInfo?.trailer }}
                  ></div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="comment" title="Comment">
              <Card style={{ maxWidth: "max-content" }}>
                <CardBody>
                  <Input
                    size="sm"
                    type="text"
                    placeholder="Say Something..."
                    startContent={
                      <MessageSquareMore color="#838383" size={20} />
                    }
                    onChange={(e) => {}}
                  />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>

        <Label title="Recomended" />
        <section
          id="Recommended"
          key={"more"}
          className="w-full flex flex-wrap items-center justify-between sm:justify-start gap-3 mt-5"
        >
          <RecommendedSection />{" "}
        </section>
      </aside>

      <Card className="py-4 hidden md:block dark w-[250px] h-min">
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={`https://image.tmdb.org/t/p/w500${movieInfo?.poster}` || ""}
            width={270}
          />
        </CardBody>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">
            {movieInfo.runtime > 60 ? "Movie" : "Series"}
          </small>
          <h4 className="font-bold text-large">{movieInfo.title}</h4>
          <small className="flex text-default-500 pt-2">
            Genre:
            <div className="flex flex-wrap gap-x-2 pl-2">
            {movieInfo.genres.map((genre: any) => (
              <span className="h-min" key={genre.id}>
                {genre.name || "N/A"}
              </span>
            ))}
            </div>
          </small>
          <small className="text-default-500">
            {"Date: " + movieInfo.releaseDate || "N/A"}
          </small>
          <small className="text-default-500">{`language: "${
            movieInfo.language || "N/A"
          }"`}</small>
          <small className="text-default-500">
            {"Rating: " + movieInfo.rating.toFixed(1)}
          </small>
        </CardHeader>
      </Card>
    </main>
  );
}
export default MoviePage;
