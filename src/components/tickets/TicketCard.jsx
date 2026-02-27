import { TbEdit } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import Badge from "../common/Badge";

export default function TicketCard({ ticket, onEdit, onDelete, onView }) {
  return (
    <div
      onClick={() => onView(ticket)}
      className="flex items-center justify-between border border-primary rounded-lg py-2 md:py-3 px-3 md:px-5 cursor-pointer hover:shadow-sm transition text-[10px] md:text-xs"
    >
      {/* ID */}
      <div className="w-[2.5rem] font-semibold text-gray-700">#{ticket.id}</div>

      {/* Title */}
      <div className="flex md:w-[8.125rem] font-medium text-gray-900 truncate">
        {ticket.title}
      </div>

      {/* Hidden on mobile */}
      <div className="hidden md:flex flex-1 text-gray-600 truncate">
        {ticket.description}
      </div>

      <div className="hidden md:block w-[13.125rem] ms-1 text-gray-800 truncate">
        {ticket.email}
      </div>

      <div className="hidden md:block w-[6.875rem] text-center">
        <Badge type="priority" value={ticket.priority} />
      </div>

      <div className="hidden md:block w-[6.25rem] text-center">
        <Badge type="status" value={ticket.status} />
      </div>

      <div className="hidden md:block w-[5.75rem] text-gray-500 text-right">
        {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
      </div>

      {/* Actions */}
      <div className="w-[4.375rem] md:w-[4.625rem] flex  gap-1 md:gap-2 justify-end">
        <button
          className="bg-green-50 hover:bg-green-100 p-1 md:p-1.5 rounded-md text-green-600"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(ticket);
          }}
        >
          <TbEdit size={14} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(ticket.id);
          }}
          className="bg-red-50 hover:bg-red-100 p-1 md:p-1.5 rounded-md text-red-600"
        >
          <HiOutlineTrash size={14} />
        </button>
      </div>
    </div>
  );
}
