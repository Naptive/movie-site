'use client'
import { Spinner } from "@nextui-org/react";

function loading() {
  return (
    <main className=" min-h-screen z-50 bg-black min-w-screen flex items-center justify-center">
     <Spinner className="z-50"/>
    </main>
  );
}
export default loading;
