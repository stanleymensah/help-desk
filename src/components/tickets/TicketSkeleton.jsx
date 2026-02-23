
export default function TicketSkeleton({count = 3}) {
  return (
    <>
    {
        [...Array(count)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border border-primary rounded-lg py-3 px-5 animate-pulse"
              >
                <div className="w-16">
                  <div className="h-4 w-10 bg-gray-200 rounded"></div>
                </div>

                <div className="w-32">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>

                <div className="flex-1">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>

                <div>
                  <div className="h-7 w-16 bg-gray-200 rounded-full"></div>
                </div>

                <div>
                  <div className="h-7 w-24 bg-gray-200 rounded-full"></div>
                </div>

                <div className="w-20">
                  <div className="h-4 w-12 bg-gray-200 rounded ml-auto"></div>
                </div>

                <div className="flex gap-2">
                  <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
                  <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))
    }
    </>
  )
}
