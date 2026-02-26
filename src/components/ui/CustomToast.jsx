import { LuTicketCheck } from "react-icons/lu";
import { TbTicketOff } from "react-icons/tb";

export function SuccessToast({ title }) {
  return (
    <div className="flex items-start gap-3">
      <LuTicketCheck color="green" className="text-green-500 mt-1" size={18} />

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-green-600">{title}</span>
      </div>
    </div>
  );
}

export function ErrorToast({ title }) {
  return (
    <div className="flex items-start gap-3">
      <TbTicketOff color="red" className="text-red-500 mt-1" size={18} />

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-red-600">{title}</span>
      </div>
    </div>
  );
}
