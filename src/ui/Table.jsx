import React from "react";

const Table = ({ fieldHeader, children, isLeft = false }) => {
  return (
    <table
      className={`${
        isLeft ? "text-left" : "text-center"
      } w-full my-5 border-collapse border border-slate-600`}
    >
      <thead>
        <tr>
          <th className="border border-slate-300 py-3">STT</th>
          {fieldHeader.map((head) => (
            <th className="border border-slate-300 py-3" key={head}>
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
