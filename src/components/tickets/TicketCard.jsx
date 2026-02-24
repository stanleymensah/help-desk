import { TbEdit } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import Badge from "../common/Badge";

export default function TicketCard({ ticket, onEdit, onDelete, onView }) {
  return (
    <div onClick={() => onView(ticket)} className="grid grid-cols-[40px_130px_2fr_210px_110px_100px_60px_90px] items-center border border-primary rounded-lg py-3 px-5 cursor-pointer hover:shadow-sm transition text-xs">
      <span className="font-semibold text-gray-700">#{ticket.id}</span>

      <span className="font-medium text-gray-900 truncate">{ticket.title}</span>

      <span className="text-gray-600 truncate">{ticket.description}</span>

      <span className="text-gray-800 truncate">{ticket.email}</span>

      <span className="text-center">
        <Badge type="priority" value={ticket.priority} />
      </span>

      <span className="text-center">
        <Badge type="status" value={ticket.status} />
      </span>

      <span className="text-gray-500 text-right">
        {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
      </span>

      <div className="flex gap-2 justify-end">
        <button
          className="bg-green-50 hover:bg-green-100 p-1.5 rounded-md text-green-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(ticket);
          }}
        >
          <TbEdit size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(ticket.id);
          }}
          className="bg-red-50 hover:bg-red-100 p-1.5 rounded-md text-red-600 cursor-pointer"
        >
          <HiOutlineTrash size={16} />
        </button>
      </div>
    </div>
  );
}
