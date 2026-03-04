import { CiSearch } from "react-icons/ci";

export default function SearchBar({ value, onChange, placeholder="Search" }) {
  return (
    <>
      <div className="w-full justify-between flex border border-gray-300 bg-white py-2 px-4 items-center rounded-lg md:w-[400px]">
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
