"use client";
import { auth, db } from "@/config";
import { Button, Input } from "@nextui-org/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowLeft, AtSign, Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [discreet, setDiscreet] = useState(true);
  const router = useRouter();

  const signIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };


  return (
    <main className="h-screen dark">
      <button
        onClick={() => router.back()}
        className="w-[50px] z-20 h-[50px] bg-white rounded-xl absolute top-[15px] left-[15px] flex justify-center md:hidden items-center"
      >
        <ArrowLeft color="black" />
      </button>

      <section className="w-full md:w-[400px] space-y-5 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex justify-center flex-col p-7">
        <Input
          size="sm"
          type="email"
          placeholder="Email"
          startContent={<AtSign color="#838383" size={20} />}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          size="sm"
          type="password"
          placeholder="Password"
          startContent={<Lock color="#838383" size={20} />}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full flex justify-end">
          <Button
            radius="sm"
            size="md"
            onPress={() => signIn()}
            className="bg-white text-black"
          >
            sign in
          </Button>
        </div>
      </section>
    </main>
  );
}

export default SignIn;
