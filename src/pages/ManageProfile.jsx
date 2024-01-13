import { useContext } from "react";
import { UserContext } from "../context/useContext";
import Heading from "../ui/Heading";

const ManageProfile = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="absolute top-36 px-20 grid grid-cols-4 w-full ">
      <div className="col-span-1  flex flex-col items-center  gap-8">
        <img
          className=""
          src={`${user?.image ? user.image : "/default-user.jpg"}`}
        />
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            type="file"
            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
          />
        </label>
      </div>
      <div className="flex flex-col col-span-3 ">
        <h1 className="text-2xl font-extrabold text-[#1a2b49]">
          Profile Details
        </h1>
        <hr />

        <div className="grid grid-cols-2 gap-5 mt-6">
          <div className="col-span-1 flex flex-col border-2 border-black/10 rounded-lg p-2">
            <span className="text-black/60 font-semibold">Email</span>
            <input
              className="text-[#1a2b49] font-semibold text-lg"
              type="text"
              value="dasdasdasd"
            />
          </div>
          <div className="col-span-1 flex flex-col border-2 border-black/10 rounded-lg p-2">
            <span className="text-black/60 font-semibold">Email</span>
            <input
              className="text-[#1a2b49] font-semibold text-lg"
              type="text"
              value="dasdasdasd"
            />
          </div>
          <div className="col-span-1 flex flex-col border-2 border-black/10 rounded-lg p-2">
            <span className="text-black/60 font-semibold">Phone</span>
            <input
              className="text-[#1a2b49] font-semibold text-lg"
              type="text"
              value="dasdasdasd"
            />
          </div>
        </div>
        <button className="bg-blue-600">Save</button>
        <h1 className="text-2xl font-extrabold text-[#1a2b49] mt-5">
          Password
        </h1>
        <hr />
        <div className="grid grid-cols-2 gap-5 mt-6">
          <div className="col-span-1 flex flex-col border-2 border-black/10 rounded-lg p-2">
            <span className="text-black/60 font-semibold">Email</span>
            <input
              className="text-[#1a2b49] font-semibold text-lg"
              type="text"
              value="dasdasdasd"
            />
          </div>
          <div className="col-span-1 flex flex-col border-2 border-black/10 rounded-lg p-2">
            <span className="text-black/60 font-semibold">Email</span>
            <input
              className="text-[#1a2b49] font-semibold text-lg"
              type="text"
              value="dasdasdasd"
            />
          </div>
          <div className="col-span-1 flex flex-col border-2 border-black/10 rounded-lg p-2">
            <span className="text-black/60 font-semibold">Phone</span>
            <input
              className="text-[#1a2b49] font-semibold text-lg"
              type="text"
              value="dasdasdasd"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
