import { useUsers } from "../features/DashBoardUsers/useUsers";

import EmpyItem from "../ui/EmpyItem";
import Pagination from "../ui/Pagination";
import SearchEq from "../ui/SearchEq";
import SortBy from "../ui/SortBy";
import Table from "../ui/Table";
import ReactLoading from "react-loading";
const DashboardUser = () => {
  const { isLoading, data } = useUsers();

  return (
    <div className="p-3 py-5 flex-col">
      <div className="items-center flex justify-between">
        <h3 className="font-[900] text-4xl text-[#1f3865]">Users</h3>
        <div className="flex gap-4">
          <SearchEq field="email" />
          <SortBy
            options={[
              {
                label: "Sort by date create (new first)",
                value: "created_at-desc",
              },
              {
                label: "Sort by date create (old first)",
                value: "created_at-asc",
              },
            ]}
          />
        </div>
      </div>

      <Table fieldHeader={["Avatar", "Email", "FullName", "Phone"]}>
        {data?.data.length > 0 &&
          data.data.map((user, index) => (
            <tr
              key={index}
              className="text-center bg-white border border-slate-300 py-6"
            >
              <td>{index + 1}</td>
              <td className="flex justify-center">
                <img
                  className="h-14 w-14 rounded-full"
                  src={`${user.avatar ? user.avatar : "/default-user.jpg"}`}
                />
              </td>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
              <td>{user.phone ? user.phone : "_"}</td>
            </tr>
          ))}
      </Table>

      {!isLoading && data?.data.length > 0 && (
        <Pagination count={data?.count} />
      )}
      {isLoading && (
        <div className="w-full flex justify-center">
          <ReactLoading type="spin" color="#1873CD" height={120} width={120} />
        </div>
      )}
      {data?.data.length === 0 && <EmpyItem />}
    </div>
  );
};

export default DashboardUser;
