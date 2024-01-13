import { useEffect, useState } from "react";
import { countTimer } from "../util/Helper";
import { useDeleteCheckoutId } from "../features/Checkout/useDeleteCheckout";
import { useDeleteBooking } from "../features/booking.js/useDeleteBooking";

const TimeCount = ({ idCheck, timeNum, arrTours }) => {
  const [timeRemaining, setTimeRemaining] = useState(countTimer(timeNum));
  const { deleteCheckout } = useDeleteCheckoutId();
  const { deleteBookingId } = useDeleteBooking();

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = countTimer(timeNum);
      setTimeRemaining(remainingTime);

      if (remainingTime.time <= 0) {
        deleteCheckout(idCheck);
        arrTours.map((id) => deleteBookingId(id));
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {timeRemaining.minutes} : {timeRemaining.seconds}
    </div>
  );
};

export default TimeCount;
