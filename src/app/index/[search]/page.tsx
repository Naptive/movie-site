"use client";
import { db } from "@/config";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spacer,
} from "@nextui-org/react";
import RecommendedSection from "@/component/recommended-section";
import { ChevronUp } from "lucide-react";
function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [resultsTwo, setResultsTwo] = useState([]);
  const [selectedKeys, setSelectedKeys] = React.useState<any>(
    new Set(["Type"])
  );
  const selectedValue: string = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  useEffect(() => {
    if (search) {
      const q = query(
        collection(db, "movies"),
        where(
          "title",
          ">=",
          search
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        )
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newResults: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(newResults);
      });

      return unsubscribe;
    } else {
      setResults([]);
    }
  }, [search]);



  const fetchFilm = async () => {
    const storedData = sessionStorage.getItem('films');
    if (storedData) {
        // Parse the stored data and set it
        const dataFromCache = JSON.parse(storedData);
        setResultsTwo(dataFromCache);
        console.log('Data loaded from session storage');
        return;
    }
    const q = query(collection(db, "movies"));
    const querySnapshot = await getDocs(q);

    const data: any = await Promise.all(
      querySnapshot.docs.map((doc) => doc.data())
    );

    setResultsTwo(data);
    console.log("just set Carousel Data");
  };

  useEffect(() => {
    fetchFilm();
  }, []);

  return (
    <main className="min-h-screen md:px-7 pt-20 space-y-5 px-3">
      <title>WilliamFlix.com || Find your movie</title>

      <div className="flex justify-end items-center dark">
        <Dropdown className="dark">
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="capitalize h-[48px] text-foreground-500 dark"
              endContent={<ChevronUp size={15} />}
            >
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
            <DropdownItem key="movie">Movie</DropdownItem>
            <DropdownItem key="series">Series</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Spacer />
        <Input
          onChange={(e) => setSearch(e.target.value)}
          size="sm"
          type="text"
          placeholder="Search"
          classNames={{ base: "w-[80%] max-w-[300px]" }}
        />
      </div>
      <section
        id="Recommended"
        className="w-full flex flex-wrap items-center justify-between sm:justify-start gap-3"
      >
        <RecommendedSection allData={search === "" ? resultsTwo : results} />
      </section>
    </main>
  );
}

export default Search;
