import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ children, onClose, icon, heading }) => {
  return (
    <div className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0">
      <div className="absolute w-full h-full bg-black/20"></div>
      <div className="bg-white z-10 rounded-lg relative shadow-lg py-6 px-3 pb-0">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            {icon}
            <span className="font-semibold text-xl">{heading}</span>
          </div>
          <AiOutlineClose
            onClick={onClose}
            size={24}
            className=" cursor-pointer hover:text-blue-800 text-blue-600"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
