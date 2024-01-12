"use client";
import { auth, db } from "@/config";
import { Button, Input } from "@nextui-org/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ArrowLeft, AtSign, Eye, EyeOff, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState('')
  const [discreet, setDiscreet] = useState(true);
  const [error, setError] = useState('')
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const signUp = async () => {
    if (password === repeatPassword) {
        createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "accountData", `${user.email}`), {
          name: name,
          email: email,
          password: password,
          likedMovies: [],
        });
        console.log("account created");
        router.back();
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage)
      });
    } else {
        setError('Passwords do not match')
    }
  };

  return (
    <main className="h-screen dark">
      <button
        onClick={() => router.back()}
        className="w-[50px] z-20 h-[50px] bg-white rounded-xl absolute top-[15px] left-[15px] flex justify-center items-center"
      >
        <ArrowLeft color="black" />
      </button>

      <section className="w-full md:w-[400px] space-y-5 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex justify-center flex-col p-7">
        <Input
          size="sm"
          type="text"
          placeholder="Name"
          startContent={<User color="#838383" size={20} />}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          size="sm"
          type="email"
          placeholder="Email"
          startContent={<AtSign color="#838383" size={20} />}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          size="sm"
          placeholder="Password"
          startContent={<Lock color="#838383" size={20} />}
          onChange={(e) => setPassword(e.target.value)}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <Eye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <Input
          size="sm"
          placeholder="Repeat Password"
          startContent={<Lock color="#838383" size={20} />}
          onChange={(e) => setRepeatPassword(e.target.value)}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <Eye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <div className="w-full flex justify-end">
          <Button
            radius="sm"
            size="md"
            onPress={() => signUp()}
            className="bg-white text-black"
          >
            sign Up
          </Button>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
