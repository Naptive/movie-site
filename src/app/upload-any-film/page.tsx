"use client";
import React, { useState } from "react";
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
} from "@nextui-org/react";
import {
  AlertCircle,
  ArrowLeft,
  FilePenLine,
  Trash,
} from "lucide-react";

const statusColorMap: any = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const columns = [
  { name: "TITLE", uid: "name" },
  { name: "ACTIONS", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

export default function App() {
  const [uploadModal, setUploadModal] = useState(false)
  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description="HD 2019 action 1.2k"
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details" className="text-black">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <AlertCircle />
              </span>
            </Tooltip>
            <Tooltip content="Edit user" className="text-black hidden md:block">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FilePenLine />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Trash />
              </span>
            </Tooltip>
          </div>
        );
    }
  }, []);

  const windowWidthCheck = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 770;
    } else {
      return false;
    }
  };

  useState(() => {
    const role: any = { name: "ROLE", uid: "role" };
    const status: any = { name: "STATUS", uid: "status" };
    if (windowWidthCheck()) {
      columns.splice(1, 0, role);
      columns.splice(2, 0, status);
    }
  });

  return (
    <main className="min-h-screen dark">
      <section className="flex justify-between px-2 py-3">
        <Button
          radius="sm"
          size="md"
          onPress={() => {}}
          className="bg-white text-black"
        >
          <ArrowLeft color="black" />
        </Button>
        <Button
          radius="sm"
          size="md"
          onPress={() => {}}
          className="bg-white text-black"
        >
          upload new
        </Button>
      </section>
      <Table
        removeWrapper
        aria-label="Example table with custom cells"
        className="p-2"
      >
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
        <TableBody items={users} className="bg-black">
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}
