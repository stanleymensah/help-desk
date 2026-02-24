export default function TicketHeader() {
  return (
    <div className="grid grid-cols-[40px_130px_2fr_210px_110px_100px_60px_90px] items-center border border-gray-200 rounded-lg py-3 px-5 bg-gray-50 font-semibold text-xs text-gray-700">
      <span>ID</span>
      <span>Title</span>
      <span>Description</span>
      <span>Email</span>
      <span>Priority</span>
      <span>Status</span>
      <span className="text-right">Date</span>
      <span>Actions</span>
    </div>
  );
}