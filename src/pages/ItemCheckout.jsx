import { IoTicketOutline } from "react-icons/io5";
import { AiOutlineClockCircle, AiOutlineUsergroupDelete } from "react-icons/ai";
const ItemCheckout = ({ data }) => {
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex gap-3 mx-5 my-3">
        <img src={data.tours.image} className="block rounded-xl" width={120} />
        <p className="font-semibold text-black/80">{data.tours.name}</p>
      </div>
      <hr />
      <div className="flex flex-col gap-2 mx-5 my-2">
        <div className="flex items-center gap-3">
          <IoTicketOutline size={28} />
          <p className="font-medium text-lg">{data.tours.time} minus</p>
        </div>
        <div className="flex items-center gap-3">
          <AiOutlineClockCircle size={28} />
          <p className="font-medium text-lg">
            {data.dateStart} at {data.hourStart}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AiOutlineUsergroupDelete size={28} />
          <p className="font-medium text-lg">
            {data.numAdult} Adult, {data.numChildren} Children
          </p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between mx-5 my-2 items-center">
        <h1 className="font-bold text-2xl text-[#1a2b49]">Price</h1>
        <p className="font-bold text-2xl text-[#1a2b49]">
          $ {data.totalPrice}
        </p>
      </div>
      <hr />
    </div>
  );
};

export default ItemCheckout;
