import ReactLoading from "react-loading";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";
import { useGetAllBooking } from "../features/booking.js/useGetAllBooking";
import EmpyItem from "../ui/EmpyItem";
import Pagination from "../ui/Pagination";
import Table from "../ui/Table";
import TypeBooking from "../ui/TypeBooking";

const DashBoardBooking = () => {
  const { data, isLoading } = useGetAllBooking();
  console.log(data?.bookings);
  return (
    <div className="p-3 py-5 flex-col">
      <div className="flex items-center justify-between">
        <h3 className="font-[900] text-4xl text-[#1f3865]">Tours</h3>
        <div className="flex gap-4">
          <Filter
            filterField="status"
            options={[
              {
                value: "",
                label: "All",
              },
              {
                value: "in-cart",
                label: "No Checkout",
              },
              {
                value: "is-process",
                label: "Is checkout",
              },
              {
                value: "success",
                label: "Checkout",
              },
            ]}
            isNum={false}
          />
          <SortBy
            options={[
              {
                label: "Sort by price (hight first)",
                value: "totalPrice-desc",
              },
              {
                label: "Sort by price (low first)",
                value: "totalPrice-asc",
              },
            ]}
          />
        </div>
      </div>

      <Table
        fieldHeader={["Email", "NameTour", "Status", "Price"]}
        isLeft={true}
      >
        {data?.bookings?.length > 0 &&
          data?.bookings?.map((booking, index) => (
            <tr
              key={index}
              className="text-left font-semibold  bg-white border border-slate-300"
            >
              <td className="pl-3">{index + 1}</td>
              <td className="">{booking.users.email}</td>
              <td>{booking.tours.name}</td>
              <td>
                <TypeBooking status={booking.status} />
              </td>
              <td className="w-14">${booking.totalPrice}</td>
              <td></td>
            </tr>
          ))}
      </Table>

      {isLoading && (
        <div className="w-full flex justify-center">
          <ReactLoading type="spin" color="#1873CD" height={120} width={120} />
        </div>
      )}
      {data?.bookings?.length === 0 && <EmpyItem />}
      {!isLoading && data?.bookings.length > 0 && (
        <Pagination count={data?.count} />
      )}
    </div>
  );
};

export default DashBoardBooking;
