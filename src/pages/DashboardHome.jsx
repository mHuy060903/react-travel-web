import { useRecentBooking } from "../features/booking.js/useRecentBooking";
import DurationChart from "../ui/DurationChart";
import Filter from "../ui/Filter";
import SalesChart from "../ui/SalesChart";
import Stats from "../ui/Stats";
import ReactLoading from "react-loading";

const DashboardHome = () => {
  const { isLoading, bookings } = useRecentBooking();

  if (isLoading) {
    <div className="w-full flex justify-center">
      <ReactLoading type="spin" color="#1873CD" height={120} width={120} />
    </div>;
  }

  return (
    <div className="p-3 py-5 flex-col">
      <div className="flex items-center justify-between">
        <h3 className="font-[900] text-4xl text-[#1f3865]">Home</h3>
        <div className="flex gap-4">
          <Filter
            filterField="last"
            options={[
              {
                value: 7,
                label: "Last 7 days",
              },
              {
                value: 30,
                label: "Last 30 days",
              },
              {
                value: 90,
                label: "Last 90 days",
              },
            ]}
          />
        </div>
      </div>
      <div className="mt-4">
        <Stats bookings={bookings} />
      </div>

      <div className="mt-4  flex">
        <SalesChart bookings={bookings} />
        <DurationChart booking={bookings} />
      </div>
    </div>
  );
};

export default DashboardHome;
