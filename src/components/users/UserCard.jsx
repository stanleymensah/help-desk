import React from "react";
import { useUsers } from "@/context/UsersContext";

export const UserCard = ({ id, img, name, role }) => {
  const { currentUser } = useUsers();
  const isCurrentUser = currentUser?.id === id;

  return (
    <>
      <div className="card relative w-44 h-48">
        <img
          src={img}
          alt="User Image"
          className="absolute z-0 object-cover w-full h-full rounded-lg border border-border"
        />
        {isCurrentUser && (
          <span className="absolute flex size-3 right-0 bottom-46">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-green-600"></span>
          </span>
        )}
        <div className="card-details absolute z-10 bottom-1 left-1 w-[95%] flex flex-col items-center bg-secondary/95 dark:bg-slate-900/95 rounded-sm py-1">
          <span className="font-medium text-[12px] text-white dark:text-gray-100">
            {name}
          </span>
          <span className="font-light text-[11px] text-white dark:text-gray-400 capitalize">
            {role}
          </span>
        </div>
      </div>
    </>
  );
};
