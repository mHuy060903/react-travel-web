import React, { useContext } from "react";
import { useGetBookingSuccess } from "../features/booking.js/useGetBookingSuccess";
import { UserContext } from "../context/useContext";
import ItemCart from "../ui/ItemCart";

export const Booking = () => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useGetBookingSuccess(user?.id);

  return (
    <div className="absolute top-28 px-20  flex-col gap-10  w-full">
      <h1 className="font-bold text-2xl text-[#1a2b49]">Your Booking</h1>
      <span className="text-xl  text-slate-600">{data?.length} activities</span>
      <div className="flex flex-col gap-3 mt-6">
        {data?.map((item) => (
          <ItemCart data={item} key={item.id} isCart={false} />
        ))}
      </div>
    </div>
  );
};
