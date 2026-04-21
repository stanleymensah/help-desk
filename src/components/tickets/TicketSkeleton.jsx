import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function TicketSkeleton({ count = 5 }) {
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
          {Array.from({ length: count }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="px-2 py-2.5 md:py-2">
                <Skeleton className="h-3 w-10" />
              </TableCell>
              <TableCell className="px-2 py-2.5 md:py-2">
                <Skeleton className="h-3 w-24" />
              </TableCell>
              <TableCell className="hidden md:table-cell px-2 py-2">
                <Skeleton className="h-3 w-full max-w-[220px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell px-2 py-2">
                <Skeleton className="h-3 w-full max-w-[180px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell text-start px-2 py-2">
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>
              <TableCell className="hidden md:table-cell text-start py-2">
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell className="hidden md:table-cell text-center px-2 py-2">
                <Skeleton className="h-3 w-20 mx-auto" />
              </TableCell>
              <TableCell className="hidden md:table-cell text-start px-2 py-2">
                <Skeleton className="h-3 w-16" />
              </TableCell>
              <TableCell className="text-right px-2 py-2.5 md:py-2">
                <div className="inline-flex gap-1 md:gap-2">
                  <Skeleton className="h-8 w-8 md:h-7 md:w-7 rounded-md" />
                  <Skeleton className="h-8 w-8 md:h-7 md:w-7 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
