const Input = ({
  id,
  label,
  register,
  errors,
  required,
  type,
  disabled,
  
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <input
        disabled={disabled}
        type={type}
        className={`${
          errors[id] ? "border-red-700" : ""
        } border-b-[1px] focus-within:outline-none`}
        id={id}
        {...register(`${id}`, { required: required })}
      />
      {errors[id] && (
        <span className="text-red-600">This field is required</span>
      )}
    </div>
  );
};

export default Input;
