import { CiSearch } from "react-icons/ci";

export default function SearchBar({ value, onChange, placeholder="Search" }) {
  return (
    <>
      <div className="w-2/3 justify-between flex border py-2 px-4 items-center rounded-full">
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder={placeholder}
          className="outline-none ring-0 border-none focus:ring-0 focus:outline-none focus:border-transparent active:border-none w-full"
        />
        <CiSearch />
      </div>
    </>
  );
}
