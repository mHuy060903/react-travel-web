import ItemTours from "./ItemTours";

const ListTours = ({ tours }) => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {tours?.map((tour) => (
        <ItemTours key={tour.id} data={tour} />
      ))}
    </div>
  );
};

export default ListTours;
