import React from "react";
import FooterItem from "./FooterItem";

const FooterList = ({ heading, list }) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-bold text-white text-xl">{heading}</span>
      {list?.map((item) => (
        <FooterItem text={item} key={item} />
      ))}
    </div>
  );
};

export default FooterList;
