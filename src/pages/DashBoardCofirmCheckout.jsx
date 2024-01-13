import Table from "../ui/Table";
import { useGetAllCheckout } from "../features/Checkout/useGetAllCheckout";
import ReactLoading from "react-loading";
import EmpyItem from "../ui/EmpyItem";
import { AiOutlineCheck } from "react-icons/ai";
import TimeCount from "../ui/TimeCount";
import { useUpdateBookingSuccess } from "../features/booking.js/useUpdateBooking";
import { useUpdateCheckout } from "../features/Checkout/useUpdateCheckout";

const DashBoardCofirmCheckout = () => {
  const { data, isLoading } = useGetAllCheckout();
  const { updateBookingCartSuccess } = useUpdateBookingSuccess();
  const { updateCheckoutSuccess } = useUpdateCheckout();

  const handleConfirmCheckout = (idCheck, arrBook) => {
    updateCheckoutSuccess(idCheck);
    arrBook.map((id) => updateBookingCartSuccess(id));
  };

  return (
    <div className="p-3 py-5 flex flex-col">
      <Table fieldHeader={["STK", "Email", "Time", "Price", "Action"]}>
        {data?.checkouts.length > 0 &&
          data.checkouts.map((checkout, index) => (
            <tr
              key={index}
              className="text-center bg-white border border-slate-300 "
            >
              <td>{index + 1}</td>
              <td className="">{checkout.stk}</td>
              <td>{checkout.users.email}</td>
              <td>
                <TimeCount
                  arrTours={checkout.idBooking}
                  idCheck={checkout.id}
                  timeNum={checkout.numTime}
                />
              </td>
              <td>$ {checkout.price}</td>
              <td>
                <button
                  onClick={() =>
                    handleConfirmCheckout(checkout.id, checkout.idBooking)
                  }
                  className="bg-green-500 hover:bg-green-800 transition duration-300 px-6 py-3 rounded-md my-3"
                >
                  <AiOutlineCheck
                    size={20}
                    className="text-white cursor-pointer"
                  />
                </button>
              </td>
            </tr>
          ))}
      </Table>
      {isLoading && (
        <div className="w-full flex justify-center">
          <ReactLoading type="spin" color="#1873CD" height={120} width={120} />
        </div>
      )}
      {data?.checkouts.length === 0 && <EmpyItem />}
    </div>
  );
};

export default DashBoardCofirmCheckout;
