"use client";
import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import {  Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const UploadMainStream = dynamic(() => import('@/component/upload-main-stream'))
const TableOfMovies = dynamic(() => import('@/component/table-of-movies'))

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  return (
    <main className="min-h-screen dark px-3 md:px-7 pt-20">
      <section className="flex justify-between">
      <Input
          classNames={{inputWrapper: "h-[40px]"}}
          radius="sm"
          type="text"
          variant="flat"
          placeholder="Email"
          startContent={<Search color="#838383" size={20} />}
          onChange={(e) => {}}
        />
        <Spacer />
        <Button radius="sm" size="md" variant="flat" onPress={onOpen}>
          Add new{' '}<Plus/>
        </Button>
        <Modal
          backdrop="blur"
          onClose={() => router.refresh()}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="dark"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  New Movie
                </ModalHeader>
                <ModalBody>
                  <UploadMainStream />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>
      <Spacer />
      <TableOfMovies />
    </main>
  );
}
