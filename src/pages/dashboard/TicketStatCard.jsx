export default function TicketStatCard({ title, number, icon }) {
  return (
    <div className="p-3 gap-2 flex-1 border flex flex-col justify-center border-gray-300 md:h-25 md:gap-1 rounded-lg md:p-2">
      <div className="flex gap-1 items-center">
        <span className="font-medium text-xs sm:text-sm truncate">{title}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-medium text-lg sm:text-3xl">{number}</span>

        <span className={`text-gray-400 p-1 rounded-sm text-xs sm:text-sm`}>
          {icon}
        </span>
      </div>
    </div>
  );
}
