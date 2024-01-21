"use client";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Main() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/dashboard');
 }, [router]);

  return (
    <main className="min-h-screen items-center justify-center flex-col flex dark gap-3 px-3">
      <title>WilliamFlix.com || Click to enter</title>
      <h1 className="text-3xl">
      Watch Anywhere,<br /> Anytime, Instantly.
      </h1>
      <p className="text-zinc-500 text-sm text-center md:max-w-[500px]">
      Unleash the power of movies with our online streaming site. Dive into a vast collection of captivating films. Unlimited entertainment awaits!.
      </p>
      <Input
        size="sm"
        type="text"
        label="Search"
        classNames={{ base: "w-[80%] max-w-[300px]" }}
      />
      <Button color="default" variant="flat" onPress={() => router.push('/watch/home')} className="px-4 rounded-md">
        Enter homepage
      </Button>
    </main>
  );
}

export default Main;
