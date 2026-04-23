import React from "react";
import { useUsers } from "@/context/UsersContext";
import { UserCard } from "@/components/users/UserCard";

export default function UsersCards() {
  const { users } = useUsers();

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {users.map((user) => (
          <UserCard
            key={user?.id}
            id={user?.id}
            img={user?.avatar}
            name={user?.fullName}
            role={user?.role}
          />
        ))}
      </div>
    </>
  );
}
