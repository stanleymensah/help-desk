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
      <div className="rounded-lg border border-border bg-card overflow-hidden text-[11px] md:text-sm">
        <Table className="table-fixed text-sm md:text-[11px]">
          <TableHeader className="bg-muted">
            <TableRow className="hover:bg-muted">
              <TableHead className="text-foreground font-semibold px-2 py-1.5 md:py-0.5 w-25">
                ID
              </TableHead>
              <TableHead className="text-foreground font-semibold px-2 py-1.5 md:py-0.5 w-55 md:w-125">
                User
              </TableHead>
              <TableHead className="text-foreground font-semibold hidden md:table-cell px-2 py-1.5">
                Username
              </TableHead>
              <TableHead className="text-foreground font-semibold text-start w-20 md:w-25 px-2 py-1.5 md:py-0.5">
                Role
              </TableHead>
              <TableHead className="text-foreground font-semibold text-start w-25 px-2 py-1.5 md:py-0.5 hidden md:table-cell">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user?.id} className="cursor-pointer md:py-8 hover:bg-muted/40">
                <TableCell className="font-semibold text-foreground px-2 py-2.5 ">
                  {user.id}
                </TableCell>
                <TableCell className="font-semibold text-foreground px-2 py-2.5">
                  <div className="flex items-center gap-4">
                    <img src={user?.avatar} alt="" className="w-8 rounded-full" />
                    <span>{user.fullName}</span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-foreground px-2 py-2.5 hidden md:table-cell">
                  {user.username}
                </TableCell>
                <TableCell className="font-semibold capitalize text-foreground px-2 py-2.5 ">
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
