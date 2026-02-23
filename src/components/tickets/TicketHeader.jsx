export default function TicketHeader() {
  return (
    <>
      <div className="card flex items-center gap-4 border border-gray-200 rounded-lg py-3 px-5 bg-gray-50 font-semibold text-xs text-gray-700">
        {/* ID */}
        <div className="w-16 flex-shrink-0">
          <span>ID</span>
        </div>

        {/* Title */}
        <div className="w-32 flex-shrink-0">
          <span>Title</span>
        </div>

        {/* Description */}
        <div className="flex-1 min-w-0 justify-center">
          <span>Description</span>
        </div>

        {/* Priority */}
        <div className="flex-shrink-0">
          <span>Priority</span>
        </div>

        {/* Status */}
        <div className="flex-shrink-0">
          <span>Status</span>
        </div>

        {/* Date */}
        <div className="w-20 flex-shrink-0 text-right">
          <span>Date</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0 w-[88px]">
          <span>Actions</span>
        </div>
      </div>
    </>
  );
}
