import Star from "./Star";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

const ItemTourFavorite = ({ tour, toogle }) => {
  return (
    <div className="flex justify-between w-full rounded-lg overflow-hidden gap-5 border relative">
      <img src={`${tour.image}`} className="w-56 h-56 object-cover " />
      <AiTwotoneHeart className="absolute top-3 text-red-500 " size={32} />
      <AiOutlineHeart
        onClick={() => toogle(tour.id)}
        className=" top-3 text-white  absolute cursor-pointer"
        size={32}
      />
      <div className="flex-1 my-4 mr-4 gap-4 flex justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-500 text-xl">GUIDED TOUR</h3>
          <h1 className="line-clamp-2 font-bold text-xl text-[#1a2b49]">
            {tour.name}
          </h1>
          <span className="text-md font-medium text-slate-700 my-1">
            {tour.time} minus
          </span>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-2">
            <span className="text-xl">4.4</span>
            <Star num={4} />
          </div>
          <span className="text-slate-600">(325 review)</span>

          <p className="mt-1 flex-col flex items-end">
            <span className="text-xl ">From </span>
            <span className="text-3xl font-bold "> {tour.price}$</span>
            <span className="text-lg font-normal ml-1"> per Person</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemTourFavorite;
