export default function TicketStatCard({ title, number, icon, color }) {
  return (
    <div
      className="
      flex-1
      border border-gray-300
      w-28 h-20 sm:w-40 sm:h-28
      rounded-lg
      p-2 sm:p-3
      flex flex-col gap-1 sm:gap-2
    "
    >
      <div className="flex gap-1 items-center">
        <span
          className={`${color.bg} ${color.text} p-1 rounded-sm text-xs sm:text-sm`}
        >
          {icon}
        </span>
        <span className="font-semibold text-xs sm:text-sm truncate">
          {title}
        </span>
      </div>

      <div className="flex items-center">
        <span className="font-semibold text-lg sm:text-3xl">{number}</span>
      </div>

      <div className="border-t border-dashed border-gray-300 mt-auto"></div>
    </div>
  );
}
