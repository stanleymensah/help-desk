import React from "react";
import UsersTables from "./UsersTables";
import { useUsers } from "@/context/UsersContext";

export default function Users() {
  const {users} = useUsers();

  return (
    <>
      <div className="container flex flex-col gap-3 items-center h-full">
        <div className="flex w-full justify-between items-center lg:w-250">
          <h3 className="font-semibold ">Users ( {users.length} )</h3>
          {/* Add User Here */}
        </div>

        <div className="w-full md:max-w-250 md:mx-auto leading-tight">
          <UsersTables />
        </div>
      </div>
    </>
  );
}
