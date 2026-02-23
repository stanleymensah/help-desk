import { TbEdit } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import Badge from "../common/Badge";

export default function TicketCard({ ticket, onEdit, onDelete }) {
  return (
    <>
      <div
        key={ticket.id}
        className="card flex items-center gap-4 border border-primary rounded-lg py-3 px-5 hover:shadow-md transition-shadow"
      >
        <div className="w-16 flex-shrink-0">
          <span className="font-semibold text-gray-700">#{ticket.id}</span>
        </div>

        <div className="w-32 flex-shrink-0">
          <span className="font-medium text-gray-900">{ticket.title}</span>
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-gray-600 line-clamp-1">
            {ticket.description}
          </span>
        </div>

        <div className="flex-shrink-0">
          <span className="py-1.5 px-2 rounded-full">
            <Badge type="priority" value={ticket.priority} />
          </span>
        </div>

        <div className="flex-shrink-0">
            <Badge type="status" value={ticket.status} />
        </div>

        <div className="w-20 flex-shrink-0 text-right">
          <span className="text-gray-500">
            {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button className="bg-green-50 hover:bg-green-100 p-2 rounded-lg text-green-600 transition-colors">
            <TbEdit size={18} />
          </button>
          <button className="bg-red-50 hover:bg-red-100 p-2 rounded-lg text-red-600 transition-colors">
            <HiOutlineTrash size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
