import { AiFillStar } from "react-icons/ai";
const fakeArray = [1, 1, 1, 1, 1];
const Star = ({ num, size = 24 }) => {
  return (
    <div className="flex items-center">
      {fakeArray.map((item, index) => {
        if (index < num) {
          return (
            <AiFillStar
              key={index}
              size={size}
              className="text-yellow-400/80"
            />
          );
        }
      })}
    </div>
  );
};

export default Star;
