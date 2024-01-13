import { useContext } from "react";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineDown,
} from "react-icons/ai";
import { TbBrandBooking } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/useContext";
import { MdManageAccounts } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import ItemManageAccount from "./ItemManageAccount";
import { toast } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const isHomePage = location === "/";
  const { user, logout } = useContext(UserContext);

  const ItemUser = [
    {
      icon: TbBrandBooking,
      text: "Bookings",
      color: "red",
      href: "/booking",
    },
    {
      icon: MdManageAccounts,
      text: "Manage Profile",
      color: "blue",
      href: "/account",
    },
    {
      icon: BiLogOutCircle,
      text: "Log out",
      color: "black",
      onClick: () => {
        logout();

        window.location.reload();
        toast.success("Logout success");
      },
    },
  ];
  return (
    <div
      className={`absolute py-3 z-50 w-full ${
        isHomePage
          ? "bg-gradient-to-b from-black to-transparent"
          : "bg-white border-b"
      }  `}
    >
      <div className=" flex justify-between items-center z-50 mx-20">
        <div
          onClick={() => navigate("/")}
          className="bg-cover bg-no-repeat w-20 h-20 cursor-pointer "
          style={{
            backgroundImage: `url(${
              isHomePage
                ? "https://cdn.getyourguide.com/tf/assets/static/logos/gyg-logo-white.svg"
                : "https://cdn.getyourguide.com/tf/assets/static/logos/gyg-logo.svg"
            })`,
          }}
        ></div>
        <div className="flex items-center gap-10">
          {isHomePage && (
            <form className="flex bg-white gap-3 items-center px-2  py-1 rounded-3xl">
              <AiOutlineSearch size={30} />
              <input
                placeholder="Where are you going?"
                className="placeholder:text-black placeholder:font-semibold font-semibold h-10 w-80 focus-within:outline-none "
              />
              <button className="bg-blue-700 rounded-3xl text-white font-semibold px-7 py-3 hover:bg-blue-800 transition">
                Search
              </button>
            </form>
          )}

          <Link
            className={`flex gap-1 items-center hover:border-blue-600 py-2 transition-all duration-300 h-full border-b-transparent border-b-4`}
            to="/favorite"
          >
            <AiOutlineHeart
              size={32}
              className={`${isHomePage ? "text-white" : "text-[#1a2b49]"}`}
            />
            {!isHomePage && (
              <span className="font-semibold text-[#1a2b49]">Wishlist</span>
            )}
          </Link>
          <Link
            to="/cart"
            className={`flex items-center gap-1 hover:border-blue-600 py-2 transition-all duration-300 h-full border-b-transparent border-b-4`}
          >
            <AiOutlineShoppingCart
              size={32}
              className={`${isHomePage ? "text-white" : "text-[#1a2b49]"}`}
            />
            {!isHomePage && (
              <span className="font-semibold text-[#1a2b49]">Cart</span>
            )}
          </Link>
          {!user && (
            <>
              <Link to="/login" className="flex items-center gap-1">
                <AiOutlineUser
                  size={32}
                  className={`${isHomePage ? "text-white" : "text-[#1a2b49]"}`}
                />
                <span
                  className={`${
                    isHomePage ? "text-white" : "text-[#1a2b49]"
                  } text-lg font-semibold`}
                >
                  Log in
                </span>
              </Link>
              <Link to="/login">
                <button className="bg-blue-700 rounded-3xl text-white font-semibold px-7 py-3">
                  Sign up
                </button>
              </Link>
            </>
          )}
          {user && (
            <div className="flex group gap-2 items-center hover:border-blue-600 py-2 border-b-transparent border-b-4 cursor-pointer duration-300 transition-colors relative">
              <span
                className={`text-lg ${
                  isHomePage ? "text-white" : "text-[#1a2b49]"
                } font-semibold`}
              >
                {user?.fullName}
              </span>
              <AiOutlineDown
                size={23}
                className={`${isHomePage ? "text-white" : "text-[#1a2b49]"}`}
              />
              <div
                className={`hidden group-hover:flex ${
                  !isHomePage ? "border-2 border-black/30" : ""
                }  flex-col absolute top-12 right-0 mt-[1px] rounded-lg hover:flex  w-60 bg-white`}
              >
                {ItemUser.map((item) => (
                  <ItemManageAccount {...item} key={item.text} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
