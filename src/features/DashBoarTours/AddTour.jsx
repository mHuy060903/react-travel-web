import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import InputFileImage from "../../ui/InputFileImage";

import { useAddTour } from "./useAddTour";
import Loading from "react-loading";

const AddTour = ({ onClose, isEdit = false, dataTour }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: isEdit ? dataTour?.name : "",
      price: isEdit ? dataTour?.price : 0,
      time: isEdit ? dataTour?.time : 0,
      description: isEdit ? dataTour?.description : "",
      image: isEdit ? dataTour?.image : null,
      type: isEdit ? dataTour?.type : 1,
    },
  });
  const { addTour, isLoading } = useAddTour();

  function onSubmit(data) {
    data.id = dataTour?.id;
    addTour(
      { ...data, isEdit },
      {
        onSettled: () => {
          reset();
          onClose();
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-5 flex flex-col w-96 overflow-hidden"
    >
      <Input
        disabled={false}
        id="name"
        label="Name"
        type="text"
        required={true}
        register={register}
        errors={errors}
      />
      <div className="flex items-center justify-between gap-4">
        <Input
          disabled={false}
          id="price"
          label="Price"
          type="number"
          required={true}
          register={register}
          errors={errors}
        />
        <Input
          disabled={false}
          id="time"
          label="Time of tour (minus)"
          type="number"
          required={true}
          register={register}
          errors={errors}
        />
      </div>
      <select {...register("type")}>
        <option value={1}>Sports</option>
        <option value={2}>Culture</option>
        <option value={3}>Food</option>
        <option value={4}>Nature</option>
      </select>
      <InputFileImage
        register={register}
        name="image"
        required={!isEdit}
        errors={errors}
        defaultImage={`${isEdit ? dataTour?.image : "/home-bg-1.jpeg"}`}
      />
      <textarea
        className="outline-none border border-slate-600 p-3"
        {...register("description", { required: true })}
      />
      {errors["description"] && (
        <span className="text-red-600">This filed is required</span>
      )}
      <button
        type="submit"
        className="bg-blue-700 rounded-xl p-3 font-semibold text-white"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <Loading type="spin" color="white" height={32} width={32} />
            <span className="text-white font-semibold">Loading...</span>
          </div>
        ) : (
          `${isEdit ? "Edit Tour" : "Add Tour"}`
        )}
      </button>
    </form>
  );
};

export default AddTour;
