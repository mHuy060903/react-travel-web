const TypeTour = ({ name }) => {
  if (name === "Sports") {
    return (
      <div className="p-1 rounded-xl text-center font-semibold text-white bg-blue-600/90">
        {name}
      </div>
    );
  }

  if (name === "Culture") {
    return (
      <div className="p-1 rounded-xl text-center font-semibold text-white bg-orange-600/90">
        {name}
      </div>
    );
  }

  if (name === "Nature") {
    return (
      <div className="p-1 rounded-xl text-center font-semibold text-white bg-green-600/90">
        {name}
      </div>
    );
  }

  if (name === "Food") {
    return (
      <div className="p-1 rounded-xl text-center font-semibold text-white bg-yellow-600/90">
        {name}
      </div>
    );
  }
};

export default TypeTour;
