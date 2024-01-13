const TypeBooking = ({ status }) => {
  if (status === "in-cart") {
    return (
      <div className="p-1 rounded-xl text-center font-semibold text-white bg-blue-600/90">
        {status}
      </div>
    );
  }

  if (status === "is-process") {
    return (
      <div className="p-1 rounded-xl text-center font-semibold text-white bg-orange-600/90">
        {status}
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="p-1 rounded-xl text-center font-semibold text-white bg-green-600/90">
        {status}
      </div>
    );
  }
};

export default TypeBooking;
