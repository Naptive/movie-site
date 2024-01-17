"use client";
import {
  Button,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spacer,
} from "@nextui-org/react";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Clapperboard, CreditCard, Link } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

function UploadMainStream() {
  const [movieId, setMovieId] = useState("");
  const [trailerLink, setTrailerLink] = useState<string>("");
  const [loadingState, setLoadingState] = useState<any>([
    { status: "Fetching", uploadVal: 0 },
  ]);
  const [movieFile, setMovieFile] = useState<File | null>(null);
  const [selectedKeys, setSelectedKeys] = React.useState<any>(
    new Set(["Quality"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  async function fetchMovieDetails() {
    const { db, storage } = await import("@/config");
    const { doc, setDoc } = await import("firebase/firestore");
    try {
      // Fetch Movie From API
         const apiKey = "85b17866e2f13a3ff4a12a5a9a6051c2";
      // const response = await fetch(
      //   `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
      // );
      // const data = await response.json();
      let data: any;
      axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`).then((response) => {
          data = response.data;
          console.log(data);
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });

      if (!movieFile) {
        alert("No File Selected");
        return;
      }

      // Rename The File
      const lastFour = movieFile.name.substr(-4);
      const myRenamedFile = new File([movieFile], `${data?.title}${lastFour}`);
      console.log(`renamed file: ${myRenamedFile.name}`);

      setLoadingState((prevState: any) => [
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

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoadingState((prevState: any) => [
          {
            ...prevState[0],
            uploadVal: progress,
          },
        ]);
      });

      try {
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);

        setLoadingState((prevState: any) => [
          {
            ...prevState[0],
            status: "Pushing",
          },
        ]);

        console.log(downloadURL);

        const movieDocRef = doc(db, "movies", cleanUpType);
        await setDoc(movieDocRef, {
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
          trailer: trailerLink,
          resolution: selectedValue,
        });

        setLoadingState((prevState: any) => [
          {
            ...prevState[0],
            status: "Done",
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setMovieFile(file);
    }
  };

  return (
    <section className="w-full md:w-[400px] space-y-5 flex justify-center flex-col p-7">
      {loadingState[0].uploadVal === 0 ? (
        <>
          <Input
            size="sm"
            type="text"
            placeholder="Movie Id"
            startContent={<CreditCard color="#838383" size={20} />}
            onChange={(e) => setMovieId(e.target.value)}
          />
          <Input
            size="sm"
            type="text"
            placeholder="Movie Trailer"
            startContent={<Link color="#838383" size={20} />}
            onChange={(e) => setTrailerLink(e.target.value)}
          />
          <Input
            size="sm"
            type="file"
            startContent={<Clapperboard color="#838383" size={20} />}
            onChange={handleFileChange}
          />
          <div className="w-full flex justify-between">
            <Dropdown className="dark">
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
              >
                <DropdownItem key="sd">SD</DropdownItem>
                <DropdownItem key="hd">HD</DropdownItem>
                <DropdownItem key="uhd">UHD</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button
              radius="sm"
              size="md"
              onPress={() => fetchMovieDetails()}
              className="bg-white text-black"
            >
              Upload
            </Button>
          </div>
        </>
      ) : (
        <section className="w-full flex flex-col items-center justify-between space-y-5 max-h-[300px]">
          <CircularProgress
            aria-label="Loading..."
            size="lg"
            value={loadingState[0].uploadVal}
            color="warning"
            showValueLabel={true}
            classNames={{
              svg: "w-36 h-36",
              value: "text-2xl font-semibold text-white",
            }}
          />
          <h2>{loadingState[0].status}</h2>
          <div className="flex justify-end w-full pt-5 md:pt-0">
            <Button
              radius="sm"
              size="md"
              color="danger"
              variant="light"
              onPress={() => {}}
            >
              Cancel
            </Button>
            <Spacer />
            <Button
              radius="sm"
              size="md"
              onPress={() => {}}
              className="bg-white text-black flex"
            >
              Pause
            </Button>
          </div>
        </section>
      )}
    </section>
  );
}

export default UploadMainStream;
