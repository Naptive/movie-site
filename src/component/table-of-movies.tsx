"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  AlertCircle,
  FilePenLine,
  MoreVertical,
  Trash,
} from "lucide-react";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { db, storage } from "@/config";
import { deleteObject, listAll, ref } from "firebase/storage";

const statusColorMap: any = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const columns = [
  { name: "TITLE", uid: "title" },
  { name: "ACTIONS", uid: "actions" },
];

interface Movie {
  title: string;
  poster: string;
  quality: boolean;
  resolution: string;
  backdrop: string;
  overview: string;
  rating: any;
  runtime: any;
}

export default function TableOfMovies() {
  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "title":
        return (
          <User
            avatarProps={{
              style: { minWidth: "40px" },
              radius: "lg",
              src: `https://image.tmdb.org/t/p/w154${user.poster}`,
            }}
            description={`${(user.resolution, user.rating, user.runtime)}`}
            name={cellValue}
          >
            {user.runtime}
          </User>
        );
      case "type":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.runtime > 50 ? "movie" : "series"}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={
              statusColorMap[user.status === "Released" ? "active" : "paused"]
            }
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            {windowWidthCheck() ? (
              <>
                <Tooltip content="Details" className="text-black">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <AlertCircle />
                  </span>
                </Tooltip>
                <Tooltip
                  content="Edit user"
                  className="text-black hidden md:block"
                >
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <FilePenLine />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <span
                    onClick={async () => DeleteDocument(user)}
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                  >
                    <Trash />
                  </span>
                </Tooltip>
              </>
            ) : (
              <Dropdown className="dark">
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <MoreVertical className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem onPress={() => DeleteDocument(user)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DeleteDocument = async (userTitle: any) => {
    const cleanUpType = userTitle.title
      ?.replace(/[^\w\s-]/g, "")
      ?.replace(/\s+/g, "-");
    try {
      await deleteDoc(doc(db, "movies", `${cleanUpType}`)).then(() => {

        const folderRef = ref(storage, userTitle.title);
        listAll(folderRef)
          .then((res) => {
            res.items.forEach((itemRef) => {
              deleteObject(itemRef)
                .then(() => {
                  fetchFilm()
                })
                .catch((error) => {
                  console.error("Error deleting file:", error);
                });
            });
          })
          .catch((error) => {
            console.error("Error listing contents of folder:", error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const windowWidthCheck = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 770;
    } else {
      return false;
    }
  };

  useState(() => {
    const role: any = { name: "Type", uid: "type" };
    const status: any = { name: "STATUS", uid: "status" };
    const containsObject = columns.some((obj) => obj.uid === role.uid);
    if (!containsObject) {
      if (windowWidthCheck()) {
        columns.splice(1, 0, role);
        columns.splice(2, 0, status);
      }
    }
  });

  const [allData, setAllData] = useState<Movie[]>([]);

  const fetchFilm = async () => {
    const q = query(collection(db, "movies"));

    const querySnapshot = await getDocs(q);
    const data: any = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setAllData(data);
    console.log("just set table Data");
  };

  useEffect(() => {
    fetchFilm();
  }, []);

  return (
    <Table removeWrapper aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={allData}>
        {(item) => (
          <TableRow key={item.rating}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
