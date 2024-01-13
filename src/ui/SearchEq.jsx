import { useSearchParams } from "react-router-dom";

const SearchEq = ({ field }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleChange(e) {
    if (!e.target.value) {
      searchParams.delete(field);
    } else {
      searchParams.set(field, e.target.value);
    }
    return setSearchParams(searchParams);
  }
  return (
    <input
      className="outline-blue-500 py-1 px-2 text-lg "
      placeholder={`Search by ${field}`}
      onChange={handleChange}
    />
  );
};

export default SearchEq;
