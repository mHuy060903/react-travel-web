import { useNavigate, useParams } from "react-router-dom";
import Star from "../ui/Star";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { AiOutlineHeart, AiTwotoneHeart, AiFillCalendar } from "react-icons/ai";
import { FaChildren } from "react-icons/fa6";
import { BsCalendarCheck, BsClockHistory } from "react-icons/bs";
import { TbCalendarTime } from "react-icons/tb";
import { MdTour } from "react-icons/md";
import { useRef, useState, useContext } from "react";
import DatePicker from "react-date-picker";
import InputBooking from "../ui/InputBooking";
import { FiUsers } from "react-icons/fi";
import Experience from "../ui/Experience";
import { useGetFourTour } from "../features/tour/useGetFourTour";

import { AiFillStar } from "react-icons/ai";

import ItemTours from "../ui/ItemTours";
import FeedBack from "../ui/FeedBack";
import { useGetTourById } from "../features/tour/useGetTourById";

import Loading from "react-loading";
import BookTour from "../ui/BookTour";
import toast from "react-hot-toast";
import { useCreateComment } from "../features/comment/useCreateComment";
import { UserContext } from "../context/useContext";
import { useGetAllComment } from "../features/comment/useGetAllComment";
import SortBy from "../ui/SortBy";
import { useFavorite } from "../features/home/useFavorite";
const ItemActivity = [
  {
    icon: BsCalendarCheck,
    title: "Free cancellation",
    text: "Cancel up to 24 hours in advance for a full refund",
  },
  {
    icon: TbCalendarTime,
    title: "Reserve now & pay later",
    text: "Keep your travel plans flexible — book your spot and pay nothing today.",
  },
  {
    icon: BsClockHistory,
    title: "Duration 6 - 9.5 hours",
    text: "Check availability to see starting times.",
  },
  {
    icon: MdTour,
    title: "Live tour guide",
    text: "English",
  },
];

const Tour = () => {
  const navigate = useNavigate();
  const params = useParams();
  const today = new Date();

  const { user, toogleFavorite } = useContext(UserContext);

  const { favorite } = useFavorite();
  const [isFavorite, setFavorite] = useState(
    user?.favoriteTours.includes(Number(params.tourId))
  );

  console.log(isFavorite);
  const [date, setDate] = useState(new Date());
  const [adult, setAdult] = useState(1);
  const [chidlren, setChidlren] = useState(0);
  const [isShowFormBooking, setIsShowFormBooking] = useState(false);

  const ref = useRef(null);

  const { tour, isLoading } = useGetTourById(params.tourId);

  const tours = useGetFourTour(params.tourId);

  const [curStarReview, setCurStarReview] = useState(0);
  const [textComment, setTextComment] = useState("");

  const { createComment, isLoading: isLoadingComment } = useCreateComment(
    tour?.id
  );

  const { data, isLoading: isLoadingGetComment } = useGetAllComment(
    params.tourId
  );

  function toggle() {
    if (user?.id) {
      favorite({ idUser: user?.id, idTour: Number(params.tourId) });
      toogleFavorite(params.tourId);
      setFavorite((cur) => !cur);
    } else {
      toast.error("You not login");
    }
  }

  const handleClickStarReview = (num) => {
    setCurStarReview(num);
  };

  const handlePostComment = () => {
    if (!curStarReview || !textComment) {
      return toast.error("Please enter full field feedback");
    }
    createComment(
      {
        idUser: user?.id,
        idTour: tour?.id,
        numStar: curStarReview,
        text: textComment,
      },
      {
        onSuccess: () => {
          setTextComment("");
          setCurStarReview(0);
        },
      }
    );
  };

  const handleSubmitBooking = () => {
    if (!date) {
      return toast.error("Please enter full field");
    }
    setIsShowFormBooking(true);
  };

  if (isLoading) {
    return (
      <div className="absolute top-28 px-20 flex justify-center w-full">
        <Loading width={100} height={100} color="blue" type="bubbles" />
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-28 px-20 flex flex-col gap-2">
        <p className="text-lg font-semibold text-slate-600">GUIDED TOUR</p>
        <h1 className="text-4xl text-[#1a2b49] font-extrabold">{tour?.name}</h1>
        <div className="flex items-center gap-6 mt-4">
          <Star num={4} />
          <p className="text-xl">4/5</p>
          <p className="text-xl">333 reviews</p>
        </div>
        <div className="grid grid-cols-3 w-full">
          <div className="col-span-2 ">
            <img src={tour?.image} className="w-full" />
            <h1 className="text-4xl text-[#1a2b49] mt-8 font-extrabold">
              About this activity
            </h1>
            <div className="flex flex-col gap-8 mt-8 ml-8">
              {ItemActivity.map((item) => (
                <div className="flex gap-4" key={item.icon}>
                  <item.icon size={30} />
                  <div className="flex flex-col gap-4">
                    <span className="text-xl font-medium">{item.title}</span>
                    <span className="text-slate-700">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div
              ref={ref}
              className="flex flex-col gap-4 justify-start rounded-2xl bg-[#1a2b49] w-full p-4 mt-6"
            >
              <h1 className="text-3xl text-white font-bold">
                Select participants, date
              </h1>
              <div className="grid grid-cols-3  gap-5">
                <InputBooking
                  icon={FiUsers}
                  text="Adult"
                  value={adult}
                  onPlus={() => setAdult((cur) => cur + 1)}
                  onMinus={() =>
                    setAdult((cur) => {
                      if (cur === 1) {
                        return 1;
                      } else {
                        return cur - 1;
                      }
                    })
                  }
                />
                <InputBooking
                  icon={FaChildren}
                  text="Children"
                  value={chidlren}
                  onPlus={() => setChidlren((cur) => cur + 1)}
                  onMinus={() =>
                    setChidlren((cur) => {
                      if (cur === 0) {
                        return 0;
                      } else {
                        return cur - 1;
                      }
                    })
                  }
                />

                <DatePicker
                  isOpen={!date}
                  minDate={new Date(today.setDate(today.getDate() + 2))}
                  value={date}
                  onChange={(value) => setDate(value)}
                  className="bg-white rounded-xl border-none"
                />
              </div>
              {!isShowFormBooking && (
                <button
                  onClick={handleSubmitBooking}
                  className="bg-blue-600 text-white text-xl rounded-3xl cursor-pointer hover:bg-blue-800 transition duration-300 font-semibold py-3"
                >
                  Check availability
                </button>
              )}
            </div>
            {isShowFormBooking && (
              <BookTour
                tour={tour}
                numAdult={adult}
                numChildren={chidlren}
                date={date}
              />
            )}
            <div className="flex flex-col">
              <h1 className="text-4xl text-[#1a2b49] mt-8 font-extrabold">
                Experience
              </h1>
              <Experience />
            </div>
          </div>

          <div className="col-span-1 flex flex-col items-center">
            <div
              onClick={toggle}
              className="flex items-center px-6 py-2 border-2 border-black rounded-lg gap-4"
            >
              {isFavorite ? (
                <>
                  <p className="text-xl font-semibold">Added to wishlist</p>
                  <AiTwotoneHeart
                    color="red"
                    className="cursor-pointer"
                    size={32}
                  />
                </>
              ) : (
                <>
                  <p className="text-xl font-semibold">Add to wishlist</p>

                  <AiOutlineHeart
                    color="black"
                    className="  text-white   cursor-pointer"
                    size={32}
                  />
                </>
              )}
            </div>
            <div className="w-full px-8">
              <div className="flex flex-col border-4 p-4 gap-4  border-slate-300 border-t-8 border-t-blue-600 mt-8 ">
                <div className="flex justify-between gap-3">
                  <p className="flex flex-col text-lg font-medium text-[#1a2b49]">
                    From
                    <span className="font-bold text-3xl">$ 300</span>
                    per person
                  </p>
                  <button
                    onClick={() =>
                      ref.current?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="font-semibold text-xl text-white bg-blue-600 rounded-[50px] flex-1 flex flex-col items-center justify-center"
                  >
                    <span>Check</span>
                    <span> availability</span>
                  </button>
                </div>
                <div className="flex  items-center gap-5">
                  <AiFillCalendar className="text-blue-600" size={60} />
                  <p className="text-slate-600">
                    Reserve now & pay later to book your spot and pay nothing
                    today
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl text-[#1a2b49] mt-8 font-extrabold ">
          You might also like...
        </h1>
        <div className="grid grid-cols-4 gap-4">
          {tours?.map((tour) => (
            <ItemTours data={tour} key={tour.id} />
          ))}
        </div>
        <hr className="my-8" />
        <h1 className="text-3xl text-[#1a2b49] mt-8 font-extrabold ">
          Customer reviews
        </h1>
        <div className="flex gap-8 items-end justify-start mt-6">
          <h1 className="text-xl text-[#1a2b49] font-semibold">
            Overall rating
          </h1>
          <p>
            <span className="text-4xl font-bold ">4.4</span>
            <span className="text-2xl text-black/60 font-bold">/5</span>
          </p>
          <div className="flex flex-col items-center">
            <Star num={4} />
            <p className="font-medium text-xl">based on 343 reviews </p>
          </div>
          <div></div>
        </div>

        <div className="flex flex-col mt-8 border-4 rounded-xl gap-4 bg-black/5">
          <div className="flex items-center justify-center">
            <AiFillStar
              onClick={() => handleClickStarReview(1)}
              className={`${
                curStarReview >= 1 ? "text-yellow-400" : "text-white"
              }   ${
                isLoadingComment ? "cursor-not-allowed" : "cursor-pointer"
              } `}
              size={40}
            />
            <AiFillStar
              onClick={() => handleClickStarReview(2)}
              className={`${
                curStarReview >= 2 ? "text-yellow-400" : "text-white"
              }   ${
                isLoadingComment ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              size={40}
            />
            <AiFillStar
              onClick={() => handleClickStarReview(3)}
              className={`${
                curStarReview >= 3 ? "text-yellow-400" : "text-white"
              }   ${
                isLoadingComment ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              size={40}
            />
            <AiFillStar
              onClick={() => handleClickStarReview(4)}
              className={`${
                curStarReview >= 4 ? "text-yellow-400" : "text-white"
              }   ${
                isLoadingComment ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              size={40}
            />
            <AiFillStar
              onClick={() => handleClickStarReview(5)}
              className={`${
                curStarReview >= 5 ? "text-yellow-400" : "text-white"
              }   ${
                isLoadingComment ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              size={40}
            />
          </div>
          <textarea
            disabled={isLoading}
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
            placeholder="Write Your Review"
            className="outline-none p-4"
          />
          <button
            onClick={handlePostComment}
            className="bg-blue-600 rounded-lg text-2xl font-semibold text-white py-2"
          >
            Post review
          </button>
        </div>
        <div className=" flex justify-between items-start gap-20 mt-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-[#1a2b49]">Sort by:</h1>
            <SortBy
              options={[
                {
                  label: "New FeedBack",
                  value: "created_at-desc",
                },
                {
                  label: "Old FeedBack",
                  value: "created_at-asc",
                },
                {
                  label: "Star (high first)",
                  value: "numStar-desc",
                },
                {
                  label: "Star (low first)",
                  value: "numStar-asc",
                },
              ]}
            />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            {isLoadingGetComment && (
              <div className="flex justify-center">
                <Loading width={100} height={100} type="spin" color="blue" />
              </div>
            )}

            {data?.comments.length > 0 && !isLoadingComment ? (
              data?.comments.map((item) => (
                <FeedBack comment={item} key={item.id} />
              ))
            ) : (
              <h1 className=" font-semibold text-2xl">No feedback in tour</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tour;
