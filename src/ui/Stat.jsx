const Stat = ({ title, color, icon, value }) => {
  return (
    <div className="flex gap-4 bg-white items-center col-span-1 rounded-lg px-4">
      <div className={`bg-${color}-500 p-2 rounded-full`}>{icon}</div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-black/40">{title}</h3>
        <h1 className="font-bold text-xl">{value}</h1>
      </div>
    </div>
  );
};

export default Stat;
