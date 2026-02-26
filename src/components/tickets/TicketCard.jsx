import { TbEdit } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import Badge from "../common/Badge";

export default function TicketCard({ ticket, onEdit, onDelete, onView }) {
  return (
    <div
      onClick={() => onView(ticket)}
      className="flex items-center border border-primary rounded-lg py-2 md:py-3 px-3 md:px-5 cursor-pointer hover:shadow-sm transition text-[10px] md:text-xs"
    >
      {/* ID */}
      <div className="w-[40px] font-semibold text-gray-700">
        #{ticket.id}
      </div>

      {/* Title */}
      <div className="flex-1 md:w-[130px] font-medium text-gray-900 truncate">
        {ticket.title}
      </div>

      {/* Hidden on mobile */}
      <div className="hidden md:flex flex-1 text-gray-600 truncate">
        {ticket.description}
      </div>

      <div className="hidden md:block w-[210px] text-gray-800 truncate">
        {ticket.email}
      </div>

      <div className="hidden md:block w-[110px] text-center">
        <Badge type="priority" value={ticket.priority} />
      </div>

      <div className="hidden md:block w-[100px] text-center">
        <Badge type="status" value={ticket.status} />
      </div>

      <div className="hidden md:block w-[60px] text-gray-500 text-right">
        {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
      </div>

      {/* Actions */}
      <div className="w-[70px] md:w-[90px] flex gap-1 md:gap-2 justify-end">
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