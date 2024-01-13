import React, { useContext } from "react";
import ItemCheckout from "./ItemCheckout";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { codeRandom } from "../util/Helper";
import { useGetBookingInCart } from "../features/booking.js/useGetBookingInCart";
import { UserContext } from "../context/useContext";
import Loading from "react-loading";
import { useCreateCheckout } from "../features/Checkout/useCreateCheckout";
import { useUpdateBooking } from "../features/booking.js/useUpdateBooking";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      code: codeRandom(),
    },
  });
  const { user } = useContext(UserContext);
  const { data } = useGetBookingInCart(user?.id);
  const totalPrice = data?.reduce((acc, item) => acc + item.totalPrice, 0) || 0;
  const { createCheckout, isLoading: isLoadingCreateCheckout } =
    useCreateCheckout();
  const arrTour = data?.map((item) => item.id);
  const { updateBookingCart } = useUpdateBooking();
  const timeCheckout = new Date().getTime() + 300000;
  const onSumitCheckout = (data) => {
    arrTour.map((id) => updateBookingCart(id));
    createCheckout(
      {
        numTime: timeCheckout,
        idUser: user?.id,
        code: data.code,
        stk: data.stk,
        idBooking: arrTour,
        price: totalPrice,
        checkout: "is-process",
      },
      {
        onSuccess: () => {
          reset();
          toast.success("Checkout Success");
        },
      }
    );
  };
  return (
    <div className="absolute top-28 px-20 flex flex-col w-full">
      <h1 className="mt-4 text-3xl font-black text-[#1a2b49]">Check out</h1>
      <div className="grid grid-cols-5 gap-5 mt-4">
        <div className="col-span-3 flex flex-col gap-3">
          <h1 className="text-xl font-semibold text-[#1a2b49]">
            Infomation Customer
          </h1>
          <form
            onSubmit={handleSubmit(onSumitCheckout)}
            className="flex flex-col gap-4"
          >
            <Input
              id="stk"
              label="STK"
              type="number"
              required={true}
              register={register}
              errors={errors}
            />
            <Input
              disabled="ok"
              id="code"
              label="Code"
              type="text"
              required={true}
              register={register}
              errors={errors}
            />
            <button
              className="bg-blue-600  flex justify-center  items-center gap-3 font-semibold text-white text-xl py-2 rounded-lg"
              type="submit"
            >
              {isLoadingCreateCheckout && (
                <Loading height={50} color="white" type="cubes" />
              )}
              <span className="mt-3">Check out</span>
            </button>
          </form>
        </div>
        <div className=" col-span-2 border-4 rounded-lg border-black/20">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold text-[#1a2b49] m-3">
              Order sumary
            </h1>
            {data?.map((item) => (
              <ItemCheckout key={item.id} data={item} />
            ))}
            <div className="flex justify-between px-5 py-2 bg-black/40 rounded-md">
              <h1 className="font-bold text-2xl text-[#1a2b49]">Subtotal</h1>
              <p className="font-bold text-2xl text-[#1a2b49]">
                $ {totalPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
