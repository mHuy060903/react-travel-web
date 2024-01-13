import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import Star from "./Star";
import { useContext, useState } from "react";
import { UserContext } from "../context/useContext";
import { useFavorite } from "../features/home/useFavorite";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetAllComment } from "../features/comment/useGetAllComment";
import { avgRating, avgStar } from "../util/Helper";

const ItemTours = ({ data }) => {
  const { favorite } = useFavorite();
  const { user } = useContext(UserContext);
  const { data: dataComment, isLoading: isLoadingGetComment } =
    useGetAllComment(data?.id);

  const navigate = useNavigate();

  const [isFavorite, setFavorite] = useState(
    user?.favoriteTours.includes(data?.id)
  );

  function toggle() {
    if (user?.id) {
      favorite({ idUser: user?.id, idTour: data.id });
      setFavorite((cur) => !cur);
    } else {
      toast.error("You not login");
    }
  }

  if (isLoadingGetComment) {
    return;
  }
  return (
    <div className="relative">
      <div
        onClick={() => navigate(`/tour/${data.id}`)}
        className="flex bg-white flex-col group gap-5 overflow-hidden rounded-lg cursor-pointer border relative"
      >
        <div className="overflow-hidden">
          <div
            className="bg-cover bg-no-repeat h-[280px] relative group-hover:scale-125 transition-transform duration-500"
            style={{ backgroundImage: `url(${data.image})` }}
          ></div>
        </div>

        <div className="flex flex-col mx-3 gap-1">
          <h3 className="font-semibold text-slate-500 text-xl">GUIDED TOUR</h3>
          <h1 className="line-clamp-2 font-bold text-xl">{data.name}</h1>
          <span className="text-md font-medium text-slate-700 my-2">
            {data.time} minus
          </span>
          <div className="flex items-center gap-3">
            {avgStar(dataComment?.comments) ? (
              <Star num={avgStar(dataComment?.comments)} />
            ) : (
              "No FeedBack"
            )}

            <span className="text-xl">{avgRating(dataComment?.comments)}</span>
            <span className="text-slate-600">
              ({dataComment?.count} review)
            </span>
          </div>
          <p className="mt-1">
            <span className="text-xl font-bold">From {data.price}$</span>
            <span className="text-xl font-normal ml-1"> per Person</span>
          </p>
        </div>
      </div>
      {isFavorite && (
        <AiTwotoneHeart
          onClick={toggle}
          className="z-100 absolute cursor-pointer top-3 text-red-500 right-3  text-"
          size={32}
        />
      )}
      <AiOutlineHeart
        onClick={toggle}
        className=" top-3 text-white cursor-pointer  absolute right-3"
        size={32}
      />
    </div>
  );
};

export default ItemTours;
