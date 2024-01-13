import React from "react";

const FooterItem = ({ text }) => {
  return (
    <div className="text-white font-semibold hover:underline cursor-pointer">
      {text}
    </div>
  );
};

export default FooterItem;
