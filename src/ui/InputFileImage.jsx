import { useEffect, useState } from "react";

const InputFileImage = ({ register, name, errors, defaultImage, required }) => {
  const [urlImage, setUrlImage] = useState(defaultImage);

  const handleChangeImage = (e) => {
    const newUrl = URL.createObjectURL(e.target.files[0]);

    setUrlImage(newUrl);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="shrink-0">
          <img
            className="h-16 w-16 object-cover rounded-full"
            src={`${urlImage}`}
            alt="Current profile photo"
          />
        </div>
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            {...register(`${name}`, {
              onChange: handleChangeImage,
              required: required,
            })}
            accept="image/*"
            type="file"
            className="block w-full text-sm text-slate-500
  file:mr-4 file:py-2 file:px-4
  file:rounded-full file:border-0
  file:text-sm file:font-semibold
  file:bg-violet-50 file:text-violet-700
  hover:file:bg-violet-100
"
          />
        </label>
      </div>
      {errors[`${name}`] && (
        <span className="text-red-500 mt-3">This field is required</span>
      )}
    </div>
  );
};

export default InputFileImage;
