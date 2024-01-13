import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      className={`p-1 rounded-lg hover:bg-slate-600/5  ${
        openId === id ? "border-[2px] border-black" : ""
      }`}
      onClick={handleClick}
    >
      <HiEllipsisVertical size={25} />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position } = useContext(MenusContext);

  if (openId !== id) return null;

  return (
    <ul className={`absolute bg-white shadow-lg border left-10 rounded-lg `}>
      {children}
    </ul>
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li className="cursor-auto hover:bg-black/20 transition duration-300">
      <button
        className="p-3 border-none text-left flex items-center gap-4"
        onClick={handleClick}
      >
        {icon}
        <span className="text-slate-700">{children}</span>
      </button>
    </li>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-start z-50">{children}</div>;
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
