const Select = ({ options, value, onChange }) => {
  return (
    <select
      className="outline-non text-lg rounded-lg p-2 cursor-pointer"
      value={value}
      onChange={onChange}
    >
      {options.map((item) => (
        <option className="" value={item.value} key={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
