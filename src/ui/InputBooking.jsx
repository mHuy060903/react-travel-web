import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const InputBooking = ({ value, onMinus, onPlus, icon: Icon, text }) => {
  return (
    <div className="flex items-center  gap-3 px-2 py-2 bg-white rounded-lg">
      <Icon size={30} className="text-black " />
      <span>{text}</span>
      <div
        onClick={onPlus}
        className="rounded-full  cursor-pointer hover:bg-black/10 p-1 border-blue-600 border-4"
      >
        <AiOutlinePlus size={20} color="blue" />
      </div>
      <span className="border-[1px] border-black/20 px-3 py-1">{value}</span>
      <div
        onClick={onMinus}
        className="rounded-full cursor-pointer hover:bg-black/10 p-1 border-blue-600 border-4"
      >
        <AiOutlineMinus size={20} color="blue" />
      </div>
    </div>
  );
};

export default InputBooking;
