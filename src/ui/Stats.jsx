import { HiOutlineBanknotes, HiOutlineBriefcase } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../util/Helper";

const Stats = ({ bookings }) => {
  const numBookings = bookings?.length;

  // 2.
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.

  return (
    <div className="grid grid-cols-4 gap-5">
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase size={30} />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes size={30} />}
        value={formatCurrency(sales)}
      />
    </div>
  );
};

export default Stats;
