"use client"
import { db, storage } from "@/config";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  ArrowLeft,
  Clapperboard,
  CreditCard,
  Link,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

function UploadMainStream() {
    const [movieId, setMovieId] = useState("");
  const [trailerLink, setTrailerLink] = useState<string>("");
  const [loadingState, setLoadingState] = useState([{ status: "Upload", uploadVal: 0 },
  ]);
  var movieFile: any;
  const router = useRouter();
  const options = ['sd', 'hd', 'UHD'];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedOptionOpen, setSelectedOptionOpen] = useState(false);

  async function fetchMovieDetails(res: any) {
    setLoadingState((prevState) => [
      {
        ...prevState[0],
        status: "Fetching",
      },
    ]);
    try {
      // Fetch Movie From api
      const apiKey = "85b17866e2f13a3ff4a12a5a9a6051c2";
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
      );

      const data: any = await response.json();
      console.log(data);

      if (movieFile !== null) {
        console.log(selectedOption);
        // Rename The File
        const lastFour = movieFile.name.substr(-4);
        const myRenamedFile = new File(
          [movieFile],
          `${data?.title}${lastFour}`
        );
        console.log(`renamed file:${myRenamedFile.name}`);

        setLoadingState((prevState) => [
          {
            ...prevState[0],
            status: "Uploading",
          },
        ]);
        const removeType = myRenamedFile.name.slice(0, -4);
        const cleanUpType = removeType
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        const storageRef = ref(storage, `${removeType}/` + myRenamedFile.name);
        const uploadTask = uploadBytesResumable(storageRef, myRenamedFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setLoadingState((prevState) => [
              {
                ...prevState[0],
                uploadVal: progress,
              },
            ]);
          },
          (error) => {
            if (error) {
              setLoadingState((prevState) => [
                {
                  ...prevState[0],
                  status: "Error",
                },
              ]);
            }
          },
          () => {
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setLoadingState((prevState) => [
                {
                  ...prevState[0],
                  status: "Pushing",
                },
              ]);
              setDoc(doc(db, "movies", cleanUpType), {
                title: data.title,
                rating: data.vote_average,
                releaseDate: data.release_date,
                status: data.status,
                overview: data.overview,
                language: data.original_language,
                backdrop: data.backdrop_path,
                poster: data.poster_path,
                filmURL: downloadURL,
                genres: data.genres,
                production_countries: data.production_countries,
                production_companies: data.production_companies,
                runtime: data.runtime,
                revenue: data.revenue,
                vote_count: data.vote_count,
                resolution: res,
                trailer: trailerLink,
              });
              setLoadingState((prevState) => [
                {
                  ...prevState[0],
                  status: "Done",
                },
              ]);
            });
          }
        );
      } else alert("Something Went Wrong");
    } catch (error) {
      console.error(error);
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      movieFile = file;
    }
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setSelectedOptionOpen(false);
  };
  return (
    <section className="w-full md:w-[400px] space-y-5 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex justify-center flex-col p-7">
    <div className="max-w-full flex bg-[#131313] rounded-md items-center px-4 gap-4">
      <CreditCard color="#838383" size={20} />
      <input
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
        type="text"
        placeholder="Movie Id"
        className="py-3 w-[90%] bg-inherit text-[#838383] placeholder:text-[#838383] focus:outline-none"
      />
    </div>

    <div className="max-w-full flex bg-[#131313] rounded-md items-center px-4 gap-4">
      <Link color="#838383" size={20} />
      <input
        value={trailerLink}
        onChange={(e) => setTrailerLink(e.target.value)}
        type="text"
        placeholder="Movie Trailer"
        className="py-3 w-[90%] bg-inherit text-[#838383] placeholder:text-[#838383] focus:outline-none"
      />
    </div>

    <div className="flex bg-[#131313] rounded-md items-center px-4 gap-4">
      <Clapperboard color="#838383" size={20} />
      <input
        type="file"
        onChange={handleFileChange}
        className="py-3 w-[90%] bg-inherit text-[#838383] placeholder:text-[#838383] focus:outline-none"
      />
    </div>
    <div className="w-full flex justify-between">
    <div className="relative">
  <h5
    onClick={() => setSelectedOptionOpen(!selectedOptionOpen)}
    className="bg-[#131313] rounded-md py-2 pl-4 pr-16 cursor-pointer"
  >
    {selectedOption}
  </h5>
  {selectedOptionOpen && (
    <div className="w-[150px] px-2 bg-[#131313] absolute top-12 rounded-md">
      {options.map((option) => (
        <h3
          key={option}
          onClick={() => handleOptionClick(option)}
          className={`p-3 ${option !== 'UHD' ? 'border-b border-zinc-800' : ''}`}
        >
          {option}
        </h3>
      ))}
    </div>
  )}
</div>
      <button
        onClick={() => fetchMovieDetails(selectedOption)}
        className="bg-white text-black py-2 px-4 rounded-md flex gap-2"
      >
        {loadingState[0].uploadVal !== 0 &&
          loadingState[0].uploadVal !== 100 &&
          loadingState[0].uploadVal.toFixed(1) + "%"}
        {loadingState[0].status}
      </button>
    </div>
  </section>
  )
}

export default UploadMainStream