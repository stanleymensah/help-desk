import React from "react";
import UsersTables from "./UsersTables";

export default function Users() {

  return (
    <>
      <div className="container flex flex-col gap-3 items-center h-full">
        <div className="flex w-full justify-between items-center lg:w-[1000px]">
          <h3>Users</h3>
          {/* Add User Here */}
        </div>

        <div className="w-full md:max-w-[1000px] md:mx-auto leading-tight">
          <UsersTables />
        </div>
      </div>
    </>
  );
}
