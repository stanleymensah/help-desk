import React from "react";
import { useUsers } from "@/context/UsersContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsersTables() {
  const { users } = useUsers();

  return (
    <>
      <div className="rounded-lg border border-gray-300 bg-white overflow-hidden text-[11px] md:text-sm">
        <Table className="table-fixed text-sm md:text-[11px]">
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-gray-50">
              <TableHead className="text-gray-700 font-semibold px-2 py-1.5 md:py-0.5 w-[100px]">
                ID
              </TableHead>
              <TableHead className="text-gray-700 font-semibold px-2 py-1.5 md:py-0.5 w-[220px] md:w-[500px]">
                User
              </TableHead>
              <TableHead className="text-gray-700 font-semibold hidden md:table-cell px-2 py-1.5">
                Username
              </TableHead>
              <TableHead className="text-gray-700 font-semibold text-start w-[80px] md:w-[100px] px-2 py-1.5 md:py-0.5">
                Role
              </TableHead>
              <TableHead className="text-gray-700 font-semibold text-start w-[100px] px-2 py-1.5 md:py-0.5 hidden md:table-cell">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user?.id} className="cursor-pointer md:py-8">
                <TableCell className="font-semibold text-gray-700 px-2 py-2.5 ">
                  {user.id}
                </TableCell>
                <TableCell className="font-semibold text-gray-700 px-2 py-2.5">
                  <div className="flex items-center gap-4">
                    <img src={user?.avatar} alt="" className="w-8 rounded-full" />
                    <span>{user.fullName}</span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-gray-700 px-2 py-2.5 hidden md:table-cell">
                  {user.username}
                </TableCell>
                <TableCell className="font-semibold capitalize text-gray-700 px-2 py-2.5 ">
                  {user.role}
                </TableCell>
                <TableCell className="hidden md:table-cell px-2 py-2.5" />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
