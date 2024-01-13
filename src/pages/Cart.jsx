import { useContext, useEffect, useState } from "react";

import ItemCart from "../ui/ItemCart";
import { UserContext } from "../context/useContext";
import { useGetBookingInCart } from "../features/booking.js/useGetBookingInCart";
import { countTimer, formatCurrency } from "../util/Helper";
import Loading from "react-loading";
import { Link } from "react-router-dom";
import { deleteBooking } from "../services/bookingApi";

const Cart = () => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useGetBookingInCart(user?.id);
  const totalPrice = data?.reduce((acc, item) => acc + item.totalPrice, 0) || 0;

  const [timeRemaining, setTimeRemaining] = useState(
    countTimer(data?.at(0)?.numTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = countTimer(data?.at(0)?.numTime);
      setTimeRemaining(remainingTime);

      if (remainingTime.time <= 0) {
        deleteBooking(data?.at(0)?.id);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="absolute top-28 px-20 flex justify-center w-full">
        <Loading width={100} height={100} color="blue" type="bubbles" />
      </div>
    );
  }

  return (
    <div className="absolute top-28 px-20 flex flex-col w-full">
      <h1 className="mt-4 text-3xl font-black text-[#1a2b49]">Shopping Cart</h1>
      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="border-t-4 border-t-[#ff5533] p-2 bg-[#ffe9e3]">
            {data?.length === 0 ? (
              <p className="font-medium text-slate-800">No tour in your cart</p>
            ) : (
              <p className="font-medium text-slate-800">
                We’ll hold your spot for
                <span className="font-semibold text-black">
                  {" "}
                  {timeRemaining.minutes} : {timeRemaining.seconds}{" "}
                </span>
                minutes
              </p>
            )}
          </div>

          {data?.map((item) => (
            <ItemCart key={item.id} data={item} />
          ))}

          <div className="flex justify-end">
            <div className="flex flex-col gap-2">
              <h1 className="text-right text-xl font-semibold">
                Total {formatCurrency(totalPrice)}
              </h1>
              <span className="font-semibold text-green-600">
                All taxes and fees included
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1 gap-5 flex flex-col  ">
          <div className="flex justify-between rounded-lg border-t-8 border-2 border-t-blue-700 w-full p-4">
            <h1 className="text-lg font-semibold">
              Total ({data?.length} item):
            </h1>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold">
                {formatCurrency(totalPrice)}
              </span>
              <span className="font-semibold text-green-600">
                All taxes and fees included
              </span>
            </div>
          </div>
          <Link
            to="/checkout"
            disabled={data?.length}
            className={`${
              data?.length ? "bg-blue-600" : "bg-black/70"
            } text-center py-3 rounded-3xl text-white text-xl font-bold`}
          >
            Check out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
