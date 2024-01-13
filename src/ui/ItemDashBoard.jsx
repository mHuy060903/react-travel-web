import { Link, useLocation } from "react-router-dom";

const ItemDashBoard = ({ href, icon: Icon, label }) => {
  const location = useLocation();
  const istruePath = location.pathname === href;
  return (
    <Link
      to={href}
      className={`flex rounded-lg py-3 pl-8 cursor-pointer hover:bg-black/5 items-center gap-3 ${
        istruePath ? "bg-black/5" : ""
      }`}
    >
      <Icon
        size={32}
        className={` ${istruePath ? "text-blue-600" : "text-black"}`}
      />
      <h3
        className={`font-semibold text-xl ${
          istruePath ? "text-blue-600" : "text-black"
        } `}
      >
        {label}
      </h3>
    </Link>
  );
};

export default ItemDashBoard;
