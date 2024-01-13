const TypeItem = ({ icon: Icon, text, onClick, currentTab, index }) => {
  return (
    <div
      className={` text-white flex items-center gap-3 justify-center px-20 ${
        currentTab === index ? "bg-white" : ""
      } rounded-t-2xl py-4 cursor-pointer`}
      onClick={onClick}
    >
      <Icon
        className={` ${currentTab === index ? "text-[#1a2b49]" : ""} `}
        size={50}
      />
      <h3
        className={` font-bold text-2xl ${
          currentTab === index ? "text-[#1a2b49]" : ""
        } `}
      >
        {text}
      </h3>
    </div>
  );
};

export default TypeItem;
