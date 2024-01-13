import { AiOutlineRight } from "react-icons/ai";
import { TbAirBalloon } from "react-icons/tb";
import { GiGreekTemple } from "react-icons/gi";
import { CiForkAndKnife } from "react-icons/ci";
import { PiMountains } from "react-icons/pi";
import TypeItem from "../ui/TypeItem";
import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import ListTours from "../ui/ListTours";
import { useGetAllTours } from "../features/DashBoarTours/useGetAllTours";
import { useSearchParams } from "react-router-dom";
import Loading from "react-loading";
import { favoriteTour } from "../services/usersApi";
import Footer from "../ui/Footer";
const TypeTravel = [
  {
    icon: TbAirBalloon,
    text: "Sports",
  },
  {
    icon: GiGreekTemple,
    text: "Culture",
  },
  {
    icon: CiForkAndKnife,
    text: "Food",
  },
  {
    icon: PiMountains,
    text: "Nature",
  },
];

const BackgroundImage = [
  {
    image: "home-bg-2.jpeg",
    text: "Exploring the World of the McLaren Technology Centre",
  },
  {
    image: "home-bg-1.jpeg",
    text: "Uncover the Hidden World of Japanese Maiko",
  },
  {
    image: "home-bg-3.jpeg",
    text: "Carib-British Roast with Original Flava",
  },
  {
    image: "home-bg-4.jpeg",
    text: "Ultimate Madeira overnight hiking experience",
  },
];

const Home = () => {
  const { data, isLoading } = useGetAllTours(true);
  const [currentTypeTravel, setCurrentTypeTravel] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set("type", currentTypeTravel + 1);
    setSearchParams(searchParams);
  }, []);

  return (
    <>
      <div
        className="w-full h-[100vh] transition-all duration-300 relative bg-cover bg-no-repeat "
        style={{
          backgroundImage: `url(${
            BackgroundImage.at(currentTypeTravel).image
          })`,
        }}
      ></div>
      <div className="top-[160px]  left-20 right-20 absolute flex flex-col justify-start gap-[40px] w-[50%]">
        <h1 className="text-white font-[900] text-7xl leading-snug">
          Travel memories you'll never forget
        </h1>
        <div>
          <p className="text-white font-bold text-3xl">
            {BackgroundImage.at(currentTypeTravel).text}
          </p>
          <div className="inline-flex items-center gap-2 font-semibold text-xl mt-8 hover:transition group cursor-pointer ">
            <span className="text-white group-hover:text-blue-700 duration-300">
              Lear more
            </span>
            <AiOutlineRight className="text-white group-hover:text-blue-700 duration-300" />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-8 items-center absolute bottom-0 right-20 left-20">
        {TypeTravel.map((item, index) => (
          <TypeItem
            icon={item.icon}
            onClick={() => {
              setCurrentTypeTravel(index);
              searchParams.set("type", index + 1);
              setSearchParams(searchParams);
            }}
            currentTab={currentTypeTravel}
            index={index}
            text={item.text}
            key={item.text}
          />
        ))}
      </div>
      <div className="relative mx-20 ">
        <Heading
          content={`Unforgettable ${TypeTravel.at(
            currentTypeTravel
          ).text.toLowerCase()} experiences`}
        />
        {isLoading && (
          <div className="flex items-center">
            <Loading type="spin" color="blue" width={30} height={30} />
          </div>
        )}
        <ListTours tours={data?.tours} isLoading={isLoading} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
