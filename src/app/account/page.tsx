"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/config";
import {
  ChevronRight,
  CircleUserRound,
  Heart,
  HeartHandshake,
  History,
  User,
} from "lucide-react";
import { Button, Switch } from "@nextui-org/react";

function MyComponent() {
  const [user, setUser] = useState<any | null>(null);
  const [isSelected, setIsSelected] = React.useState(true);
  const router = useRouter();

  const handleSignOut = async () => {
    const { signOut } = await import('firebase/auth');
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(`Failed to sign out: ${error}`);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: any) => {
      console.log("Auth state changed:", authUser);
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="h-screen dark">
      <title>William | Chat</title>

      {user ? (
        <div className="absolute text-[#838383] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-end justify-center gap-2 w-[90%]">
          <section className="flex mb-5 h-[58px] w-full items-center px-4 gap-4">
            <User size={28} />
            <div>
              <h1 className="text-[17px]">
                {auth.currentUser?.displayName || "user32321"}
              </h1>
              <h1 className="text-[14px]">{auth.currentUser?.email}</h1>
            </div>
          </section>
          <section onClick={() => router.push('edit')} className="flex cursor-pointer h-[58px] w-full bg-[#131313] rounded-md items-center justify-between px-4 gap-4">
            <aside className="flex gap-3">
              <CircleUserRound />
              <h1>Account</h1>
            </aside>
            <ChevronRight />
          </section>
          <section className="flex h-[58px] w-full bg-[#131313] rounded-md items-center justify-between px-4 gap-4">
            <aside className="flex gap-3">
              <History />
              <h1>History</h1>
            </aside>
            <ChevronRight />
          </section>
          <section className="flex h-[58px] w-full bg-[#131313] rounded-md items-center justify-between px-4 gap-4">
            <aside className="flex gap-3">
              <Heart />
              <h1>Saved to watch later</h1>
            </aside>
            <ChevronRight />
          </section>
          <section className="flex h-[58px] w-full bg-[#131313] rounded-md items-center justify-between px-4 gap-4">
            <aside className="flex gap-3">
              <HeartHandshake />
              <h1>Save my history</h1>
            </aside>
            <Switch defaultSelected color="primary"></Switch>
          </section>

          <Button radius="sm" size="lg" onPress={() => handleSignOut()} className="text-[#838383] bg-[#131313]">sign out</Button>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 w-2/3">
          <h4 className="text-center text-[#838383] text-[15px]">
          Exclusive content awaits. Sign up for personalized benefits!
          </h4>
          <div className="flex gap-3">
            <Button radius="sm" size="lg" onPress={() => {
              router.push("sign-up")
            }} className="bg-transparent border border-white border-solid">sign up</Button>
            <Button radius="sm" size="lg" onPress={() => {
              router.push("sign-in")
            }} className="bg-white text-black">sign in</Button>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyComponent;
