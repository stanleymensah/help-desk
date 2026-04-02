import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function SearchBar({ value, onChange, placeholder = "Search" }) {
  return (
    <InputGroup className="w-[220px] md:w-[300px]">
      <InputGroupAddon align="inline-start">
        <SearchIcon className="size-4 text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput
        id="ticket-search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label="Search tickets"
        className="!text-[11px]"
      />
    </InputGroup>
  );
}
