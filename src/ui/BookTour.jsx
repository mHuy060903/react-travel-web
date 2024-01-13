import { useContext, useEffect, useState } from "react";
import { BsClockHistory, BsCalendarCheck } from "react-icons/bs";
import Loading from "react-loading";
import { useCreateBooking } from "../features/booking.js/useCreateBooking";
import { UserContext } from "../context/useContext";
import { useNavigate } from "react-router-dom";
const optionsTime = [
  "9:20 AM",
  "10:20 AM",
  "11:20 AM",
  "12:20 AM",
  "13:20 PM",
  "14:20 PM",
  "15:20 PM",
  "16:20 PM",
  "17:20 PM",
];
const BookTour = ({ tour, numChildren, numAdult, date }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hourStart, setHourStart] = useState(optionsTime[0]);
  const priceChildren = numChildren * Math.ceil(tour.price * 0.7);
  const priceAdult = numAdult * tour.price;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const { addBooking, isLoading: isBookingLoading } = useCreateBooking();

  const handleSubmit = () => {
    const today = new Date();

    const timeInCart = new Date(today.setHours(today.getHours() + 1)).getTime();

    addBooking(
      {
        idUser: user.id,
        idTour: tour.id,
        numChildren,
        numAdult,
        dateStart: date,
        hourStart,
        status: "in-cart",
        numTime: timeInCart,
        totalPrice: priceChildren + priceAdult,
      },
      {
        onSuccess: () => navigate("/cart"),
      }
    );
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearInterval(time);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-8">
        <Loading width={100} height={100} color="blue" type="spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full border-2 border-blue-600 rounded-lg p-3 mt-4 gap-3">
      <h1 className="text-2xl font-bold text-[#1a2b49]">{tour.name}</h1>

      <div className="flex gap-2 items-center text-xl">
        <BsClockHistory />
        35 minus
      </div>
      <hr />
      <div className=" flex-col gap-4 inline-block">
        <h1 className="text-xl font-semibold text-[#1a2b49]">
          Select a starting time
        </h1>
        <select
          value={hourStart}
          onChange={(e) => setHourStart(e.target.value)}
          className="text-xl font-semibold outline-none border-4 border-slate-500 p-2 mt-3 rounded-lg "
        >
          {optionsTime.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <div className="flex items-start justify-between gap-10">
        <div className="flex items-start gap-4">
          <BsCalendarCheck size={32} />
          <p className="text-lg">
            Cancel before 9:20 AM on August 2 for a full refund
          </p>
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <h1 className="text-lg font-semibold ">Price breakdown</h1>
          {!!numChildren && (
            <div className="flex justify-between items-center text-lg  text-slate-500 font-medium">
              <span>
                Children {numChildren} × ${Math.ceil(tour.price * 0.7)}{" "}
              </span>
              <span>₫ {priceChildren}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-lg  text-slate-500 font-medium">
            <span>
              Adult {numAdult} × $ {tour.price}{" "}
            </span>
            <span>$ {priceAdult}</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <p className="flex flex-col text-slate-500 font-medium text-lg">
          Total price
          <span className="text-[#1a2b49] text-2xl font-black">
            $ {priceAdult + priceChildren}
          </span>
          All taxes and fees included
        </p>
        <div className="flex items-center gap-6">
          <button className="bg-slate-500/10 text-xl text-blue-600 font-bold border-blue-600 border-4 py-4 px-6 rounded-3xl">
            Book now
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-bold text-xl  border-blue-600 border-4 py-4 px-6 rounded-3xl"
          >
            {isBookingLoading ? (
              <Loading width={50} height={50} color="blue" type="spin" />
            ) : (
              <span>Add to cart</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookTour;
