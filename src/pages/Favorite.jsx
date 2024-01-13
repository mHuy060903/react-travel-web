import { useContext } from "react";
import { UserContext } from "../context/useContext";

import ItemTourFavorite from "../ui/ItemTourFavorite";
import { useGetFavorite } from "../features/DashBoarTours/useGetFavorite";
import { useFavorite } from "../features/home/useFavorite";
import toast from "react-hot-toast";

const Favorite = () => {
  const { user, toogleFavorite } = useContext(UserContext);
  const { data, isLoading } = useGetFavorite(user?.favoriteTours);

  const { favorite } = useFavorite();

  function toggle(id) {
    if (user?.id) {
      favorite({ idUser: user?.id, idTour: Number(id) });
      toogleFavorite(id);
    } else {
      toast.error("You not login");
    }
  }
  return (
    <div className="absolute top-28 px-20  flex-col gap-10  w-full">
      <h1 className="font-bold text-2xl text-[#1a2b49]">Your Favorite Tours</h1>
      <span className="text-xl  text-slate-600">{data?.length} activities</span>
      <div className="flex flex-col gap-3 mt-6">
        {data?.map((item) => (
          <ItemTourFavorite toogle={toggle} key={item.id} tour={item} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
