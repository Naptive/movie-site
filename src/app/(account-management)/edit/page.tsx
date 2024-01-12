"use client";
import { Button, Input } from "@nextui-org/react";
import { AtSign, Lock, User } from "lucide-react";
import React, { useState } from "react";
import { getAuth, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "@/config";
import { redirect, useRouter } from "next/navigation";

function Edit() {
  const [name, setName] = useState<string>(auth?.currentUser?.displayName);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  function updatePfp() {
    setLoading(true);
    updateProfile(auth?.currentUser, {
      displayName: name,
    }).then(() => {
      updateEmail(auth.currentUser, email).then(() => {
        updatePassword(auth.currentUser, password).then(() => {
          setLoading(false);
          console.log(auth.currentUser);
          router.back()
        })
       
      });
    });
  }

  return (
    <main className="min-h-screen relative dark">
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
          type="text"
          placeholder="Password"
          startContent={<Lock color="#838383" size={20} />}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="w-full flex justify-end">
          <Button
            isLoading={loading}
            radius="sm"
            size="md"
            onPress={() => updatePfp()}
            className="bg-white text-black"
          >
            sign Up
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Edit;
