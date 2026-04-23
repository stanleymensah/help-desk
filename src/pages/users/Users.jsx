import React from "react";
import UsersCards from "./UsersCards";

export default function Users() {

  return (
    <>
      <div className="container flex flex-col gap-4 items-center h-full">
        <div className="flex w-full items-center justify-center py-4">
          <p className="font-light text-2xl text-center">
            Meet the team that makes the magic happen ✨
          </p>
          {/* Add User Here */}
        </div>

        <div className="w-full md:max-w-250 flex items-center justify-center">
          <UsersCards />
        </div>
      </div>
    </>
  );
}
