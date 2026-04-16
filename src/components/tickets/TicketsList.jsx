import TicketSkeleton from "./TicketSkeleton";
import ErrorBoundary from "../common/ErrorBoundary";
import { Badge } from "../ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDate } from "@/lib/date";

function getStatusBadgeStyle(status) {
  switch (status) {
    case "open":
      return { backgroundColor: "#dbeafe", borderColor: "#93c5fd", color: "#1d4ed8" };
    case "assigned":
      return { backgroundColor: "#ffedd5", borderColor: "#fdba74", color: "#c2410c" };
    case "in-progress":
      return { backgroundColor: "#dcfce7", borderColor: "#86efac", color: "#15803d" };
    case "resolved":
      return { backgroundColor: "#e5e7eb", borderColor: "#9ca3af", color: "#374151" };
    case "closed":
      return { backgroundColor: "#f3e8ff", borderColor: "#d8b4fe", color: "#7e22ce" };
    case "reopened":
      return { backgroundColor: "#fef9c3", borderColor: "#fde047", color: "#a16207" };
    default:
      return { backgroundColor: "transparent", borderColor: "currentColor", color: "inherit" };
  }
}

function getPriorityBadgeStyle(priority) {
  switch (priority) {
    case "low":
      return { backgroundColor: "#ccfbf1", borderColor: "#5eead4", color: "#0f766e" };
    case "medium":
      return { backgroundColor: "#fef3c7", borderColor: "#fcd34d", color: "#b45309" };
    case "high":
      return { backgroundColor: "#fee2e2", borderColor: "#fca5a5", color: "#b91c1c" };
    default:
      return { backgroundColor: "transparent", borderColor: "currentColor", color: "inherit" };
  }
}

export default function TicketsList({
  tickets,
  isPending,
  error,
  searchTerm,
  onView,
  onEdit,
  onDelete,
}) {
  if (isPending) {
    return <TicketSkeleton count={5} />;
  }

  if (error) {
    return <ErrorBoundary message={error.message} />;
  }

  if (tickets.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 text-xs">
        {searchTerm
          ? `No tickets found for "${searchTerm}"`
          : "No tickets found."}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-300 bg-white overflow-hidden text-sm md:text-[11px]">
      <Table className="table-fixed text-sm md:text-[11px]">
        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-gray-50">
            <TableHead className="text-gray-700 font-semibold px-2 py-1.5 md:py-0.5 w-[58px]">
              ID
            </TableHead>
            <TableHead className="text-gray-700 font-semibold px-2 py-1.5 md:py-0.5 w-[150px]">
              Title
            </TableHead>
            <TableHead className="text-gray-700 font-semibold hidden md:table-cell px-2 py-1.5">
              Description
            </TableHead>
            <TableHead className="text-gray-700 font-semibold hidden md:table-cell w-[180px] px-2 py-1.5">
              Email
            </TableHead>
            <TableHead className="text-gray-700 font-semibold hidden md:table-cell text-start w-[80px] px-2 py-1.5">
              Priority
            </TableHead>
            <TableHead className="text-gray-700 font-semibold hidden md:table-cell text-start w-[80px] px-2 py-1.5">
              Status
            </TableHead>
            <TableHead className="text-gray-700 font-semibold hidden md:table-cell text-center w-[150px] px-2 py-1.5">
              Assigned To
            </TableHead>
            <TableHead className="text-gray-700 font-semibold hidden md:table-cell text-start w-[88px] px-2 py-1.5">
              Date
            </TableHead>
            <TableHead className="text-gray-700 font-semibold text-start w-[74px] px-2 py-1.5 md:py-0.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tickets.map((ticket) => (
            <TableRow
              key={ticket.id}
              onClick={() => onView(ticket)}
              className="cursor-pointer"
            >
              <TableCell className="font-semibold text-gray-700 px-2 py-2.5 md:py-2">
                TIC-{ticket.id}
              </TableCell>
              <TableCell className="font-medium text-gray-900 max-w-[100px] truncate px-2 py-2.5 md:py-2">
                {ticket.title}
              </TableCell>
              <TableCell className="hidden md:table-cell text-gray-600 max-w-[220px] truncate px-2 py-2">
                {ticket.description}
              </TableCell>
              <TableCell className="hidden md:table-cell text-gray-800 max-w-[180px] truncate px-2 py-2">
                {ticket.email}
              </TableCell>
              <TableCell className="hidden md:table-cell text-start px-2 py-2">
                <Badge
                  variant="outline"
                  className="capitalize text-xs"
                  style={getPriorityBadgeStyle(ticket.priority)}
                >
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell text-start py-2">
                <Badge
                  variant="outline"
                  className="capitalize text-xs"
                  style={getStatusBadgeStyle(ticket.status)}
                >
                  {ticket.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell text-center text-gray-800 max-w-[150px] truncate px-2 py-2">
                {ticket.assignedTo || "-"}
              </TableCell>
              <TableCell className="hidden md:table-cell text-start text-gray-500 px-2 py-2">
                {formatDate(ticket.createdAt)}
              </TableCell>
              <TableCell className="text-right px-2 py-2.5 md:py-2">
                <div className="inline-flex gap-1 md:gap-2">
                  <button
                    className="bg-green-50 hover:bg-green-100 p-2 md:p-1.5 rounded-md text-green-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(ticket);
                    }}
                  >
                    <Pencil className="size-4 md:size-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(ticket);
                    }}
                    className="bg-red-50 hover:bg-red-100 p-2 md:p-1.5 rounded-md text-red-600"
                  >
                    <Trash2 className="size-4 md:size-3.5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
