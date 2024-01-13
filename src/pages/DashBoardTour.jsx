import { useState } from "react";
import AddTour from "../features/DashBoarTours/AddTour";
import Filter from "../ui/Filter";
import Modal from "../ui/Modal";
import SortBy from "../ui/SortBy";
import ReactLoading from "react-loading";
import { useGetAllTours } from "../features/DashBoarTours/useGetAllTours";
import EmpyItem from "../ui/EmpyItem";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";
import Menus from "../ui/Menus";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../ui/ConfirmDelete";

import { MdTour } from "react-icons/md";
import { useDeleteTour } from "../features/DashBoarTours/useDeleteTour";
import TypeTour from "../ui/TypeTour";
const DashBoardTour = () => {
  const { isLoading: isLoadingDelete, deleteTourMuatate } = useDeleteTour();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const { data, isLoading } = useGetAllTours();
  function handleEdit(data) {
    setIsModalEdit(true);
    setIsOpenModal(true);
    setIsEdit(true);
    setDataEdit(data);
  }

  return (
    <>
      <div className="p-3 py-5 flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-[900] text-4xl text-[#1f3865]">Tours</h3>
          <div className="flex gap-4">
            <Filter
              filterField="type"
              options={[
                {
                  value: 0,
                  label: "All",
                },
                {
                  value: 1,
                  label: "Sports",
                },
                {
                  value: 2,
                  label: "Culture",
                },
                {
                  value: 3,
                  label: "Food",
                },
                {
                  value: 4,
                  label: "Nature",
                },
              ]}
            />
            <SortBy
              options={[
                {
                  label: "Sort by price (hight first)",
                  value: "price-desc",
                },
                {
                  label: "Sort by price (low first)",
                  value: "price-asc",
                },
              ]}
            />
          </div>
        </div>
        <Menus>
          <Table
            fieldHeader={["Image", "Name", "Price", "Type", "Time", "Actions"]}
            isLeft={true}
          >
            {data?.tours?.length > 0 &&
              data?.tours?.map((tour, index) => (
                <tr
                  key={index}
                  className="text-left font-semibold  bg-white border border-slate-300"
                >
                  <td className="pl-3">{index + 1}</td>
                  <td className="flex justify-start my-3 w-44">
                    <img className="h-20 w-40 " src={`${tour.image}`} />
                  </td>
                  <td>{tour.name}</td>
                  <td className="w-14">{tour.price}$</td>
                  <td>
                    <TypeTour name={tour.typeTour.name} />
                  </td>
                  <td className="pl-3">{tour.time} minus</td>
                  <td className="relative w-40">
                    <Menus.Menu>
                      <Menus.Toggle id={tour.id} />

                      <Menus.List id={tour.id}>
                        <Menus.Button
                          onClick={() => handleEdit(tour)}
                          icon={<HiSquare2Stack size={20} color="yellow" />}
                        >
                          Edit
                        </Menus.Button>
                        <Menus.Button
                          onClick={() => {
                            setIsModalEdit(false);
                            setIsOpenModal(true);
                            setDataEdit(tour);
                          }}
                          icon={<HiTrash color="red" size={20} />}
                        >
                          Delete
                        </Menus.Button>
                      </Menus.List>
                    </Menus.Menu>
                  </td>
                </tr>
              ))}
          </Table>
        </Menus>
        {isLoading && (
          <div className="w-full flex justify-center">
            <ReactLoading
              type="spin"
              color="#1873CD"
              height={120}
              width={120}
            />
          </div>
        )}
        {data?.tours?.length === 0 && <EmpyItem />}
        {!isLoading && data?.tours.length > 0 && (
          <Pagination count={data?.count} />
        )}
        <button
          onClick={() => {
            setIsModalEdit(true);
            setIsOpenModal(true);
            setIsEdit(false);
            setDataEdit(null);
          }}
          className=" bg-blue-600 px-5 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-blue-800"
        >
          Add Tour
        </button>
      </div>
      {isOpenModal && (
        <Modal
          icon={<MdTour size={30} color="blue" />}
          heading="Manage Tour"
          onClose={() => setIsOpenModal(false)}
        >
          <div className="flex flex-col p-5 ">
            {isModalEdit ? (
              <AddTour
                isEdit={isEdit}
                dataTour={dataEdit}
                onClose={() => setIsOpenModal(false)}
              />
            ) : (
              <ConfirmDelete
                isLoading={isLoadingDelete}
                onConfirm={() => {
                  deleteTourMuatate(dataEdit?.id, {
                    onSettled: setIsOpenModal(false),
                  });
                }}
                name={dataEdit?.name}
                onClose={() => setIsOpenModal(false)}
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default DashBoardTour;
