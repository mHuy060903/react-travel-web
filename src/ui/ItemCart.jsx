import { BsTrash } from "react-icons/bs";
import { useEffect } from "react";
import Star from "./Star";
import { FiUsers } from "react-icons/fi";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { useDeleteBooking } from "../features/booking.js/useDeleteBooking";
const ItemCart = ({ data, isCart = true }) => {
  const { deleteBookingId, isLoading } = useDeleteBooking();

  useEffect(() => {
    if (data.numTime < new Date().getTime() && isCart) {
      return deleteBookingId(data.id);
    }
  }, [data, deleteBookingId]);

  return (
    <>
      <div className="flex justify-between gap-4">
        <div className="w-32">
          <img src={data.tours.image} className="h-28" />
        </div>
        <div className="flex-1 flex flex-col ">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{data.tours.name}</h1>
              <span className="text-lg text-slate-600 ">
                {data.tours.time} minus
              </span>
            </div>
            {isCart && (
              <BsTrash
                onClick={() => deleteBookingId(data.id)}
                className="text-blue-500 cursor-pointer hover:text-blue-900"
                size={30}
              />
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span>4.6</span>
              <Star num={5} size={20} />
              <span className="text-slate-600">(1,357)</span>
            </div>
            <p>
              $ <span className="font-bold text-lg"> {data.totalPrice}</span>
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <FiUsers />
            <span>
              {data.numAdult} Adults , {data.numChildren} Children{" "}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <AiOutlineCalendar />
            <span>{new Date(data.dateStart).toDateString()} </span>
            <span>({data.dateStart})</span>
          </div>
          <div className="flex gap-4 items-center">
            <AiOutlineClockCircle />
            <span>Starting time: {data.hourStart} (local time) </span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ItemCart;
