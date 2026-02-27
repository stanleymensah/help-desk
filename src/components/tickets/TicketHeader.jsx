export default function TicketHeader() {
  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg py-2 md:py-3 px-3 md:px-5 bg-gray-50 font-semibold text-[10px] md:text-xs text-gray-700">

      {/* ID */}
      <div className="w-[40px]">ID</div>

      {/* Title */}
      <div className="flex justify-center md:w-[130px] justify-start">Title</div>

      {/* Hidden on mobile */}
      <div className="hidden md:flex flex-1">Description</div>

      <div className="hidden md:block w-[210px]">Email</div>

      <div className="hidden md:block w-[110px] text-center">Priority</div>

      <div className="hidden md:block w-[100px] text-center">Status</div>

      <div className="hidden md:block w-[95px] text-right">Date</div>

      {/* Actions */}
      <div className="w-[70px] md:w-[75px] flex justify-end">Actions</div>

    </div>
  );
}