import { Link } from "react-router-dom";

const ItemManageAccount = ({ icon: Icon, color, text, href, onClick }) => {
  if (href === undefined) {
    return (
      <div
        className="flex py-3 items-center justify-start pl-2 hover:bg-black/10 transition duration-300 gap-3 cursor-pointer"
        onClick={onClick}
      >
        <Icon color={color} size={32} />
        <span>{text}</span>
      </div>
    );
  }

  return (
    <Link
      className="flex py-3 items-center justify-start pl-2 hover:bg-black/10 transition duration-300 gap-3"
      to={href}
    >
      <Icon color={color} size={32} />
      <span>{text}</span>
    </Link>
  );
};

export default ItemManageAccount;
