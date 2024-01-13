import { month } from "../util/Constants";
import Star from "./Star";

const FeedBack = ({ comment }) => {
  const date = new Date(comment.created_at);

  return (
    <div className="flex justify-between items-start">
      <div className="flex justify-between w-full">
        <div className="flex flex-col flex-1 gap-1">
          <Star num={comment.numStar} />
          <p className="text-lg font-medium">{comment.text}</p>
          <div className="flex gap-3 items-center">
            <img
              src={
                comment.users.avatar
                  ? comment.users.avatar
                  : "/default-user.jpg"
              }
              width={60}
            />
            <span>{comment.users.fullName}</span>
          </div>
        </div>

        <p className="text-lg font-medium text-slate-500">
          {month[date.getMonth()]} {date.getDate().toString()} ,{" "}
          {date.getFullYear().toString()}
        </p>
      </div>
      <div className="p-2 text-black block w-3 h-3" />
    </div>
  );
};

export default FeedBack;
