// import { AiOutlineClose, AiOutlineWarning } from "react-icons/ai";

import Loading from "react-loading";

const ConfirmDelete = ({ name, onClose, onConfirm, isLoading }) => {
  return (
    <div className="flex flex-col gap-5">
      <span className="text-xl">
        Are you sure want to delete
        <span className="font-semibold"> {name}</span> tour ?{" "}
      </span>
      <div className="flex justify-end gap-3 mt-8">
        <button
          className="p-3 flex gap-2 hover:bg-red-700 rounded-lg bg-red-500 font-semibold transition duration-300 text-white"
          onClick={onConfirm}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <Loading width={40} height={40} type="spin" color="white" />
              <span>Loading</span>
            </div>
          ) : (
            "Confirm"
          )}
        </button>
        <button
          className="p-3 rounded-lg font-semibold transition duration-300 bg-slate-500 hover:bg-slate-700 "
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
