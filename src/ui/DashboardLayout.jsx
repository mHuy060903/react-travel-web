import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { MdOutlineTour } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { Outlet, useNavigate } from "react-router-dom";
import ItemDashBoard from "./ItemDashBoard";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/useContext";
import useUser from "../features/auth/useUser";
import ReactLoading from "react-loading";
import Avatar from "./Avatar";
import { CiLogout } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
const ItemsDashBoard = [
  {
    icon: AiOutlineHome,
    label: "Home",
    href: "/dashboard",
  },
  {
    icon: AiOutlineUser,
    label: "Users",
    href: "/dashboard/users",
  },
  {
    icon: MdOutlineTour,
    label: "Tours",
    href: "/dashboard/tours",
  },
  {
    icon: TbBrandBooking,
    label: "Bookings",
    href: "/dashboard/bookings",
  },
  {
    icon: IoBagCheckOutline,
    label: "Comfirm CheckOut",
    href: "/dashboard/confirmcheckout",
  },
];

const DashboardLayout = () => {
  const { isLoading, data } = useUser();
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && data) {
      return login(data);
    } else if (!isLoading && !data) {
      return navigate("/");
    }
  }, [data, login, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-white flex items-start justify-center">
        <ReactLoading type="spokes" color="blue" height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="grid-cols-4 grid w-full h-[100vh]">
      <div className="flex flex-col col-span-1 p-5 gap-3 border-r-black/5 border-r-2 ">
        <div
          className="flex items-center justify-center gap-6 my-5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/travel-logo.jpg" className="w-24 h-20" />
          <div
            className="bg-cover w-20 h-20"
            style={{
              backgroundImage:
                "url(https://cdn.getyourguide.com/tf/assets/static/logos/gyg-logo.svg)",
            }}
          ></div>
        </div>
        {ItemsDashBoard.map((item) => (
          <ItemDashBoard {...item} key={item.href} />
        ))}
      </div>

      <div className="col-span-3 flex flex-col h-[100vh-60px]">
        <div className="flex py-2 px-3 justify-end gap-3 ">
          <div className="cursor-pointer  flex items-center gap-2">
            <Avatar
              src={`${data?.image ? data?.image : "/default-user.jpg"}`}
            />
            <span>{data?.fullName}</span>
          </div>
          <div className="cursor-pointer hover:bg-slate-200 transition duration-300 p-3 rounded-full bg-white">
            <AiOutlineUser size={28} color="blue" />
          </div>
          <div className="cursor-pointer hover:bg-slate-200 transition duration-300 p-3 rounded-full bg-white">
            <CiLogout size={28} color="blue" />
          </div>
        </div>
        <div className="bg-black/5 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
