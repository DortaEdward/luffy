import img from "../img.jpg";
import Image from "next/image";
import {
  FiHeart,
  FiMessageSquare,
  FiSend,
  FiBookmark,
  FiMoreHorizontal,
} from "react-icons/fi";




const SpotCard = ({spot}:any) => {
  return (
    <div className="w-[360px] rounded-md bg-gray-400 bg-opacity-10 bg-clip-padding p-2 text-gray-200 shadow-2xl backdrop-filter">
      <div className="my-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={spot.author.image}
            alt={"Author"}
            width={36}
            height={36}
            className="h-[40px] w-[40px] rounded-full"
          />
          <div className="leading-[1.2]">
            <p className="font-medium">{spot.author.name}</p>
            <p className="text-[0.8rem]">Aug 30, 2022</p>
          </div>
        </div>
        <div>
          <FiHeart size={28} className="stroke-2" />
        </div>
      </div>
      <div className="mx-auto w-[340px]">
        <img
          src={spot.image_url}
          alt={"picture of the city"}
          className="w-full object-cover aspect-square"
          width={50}
          height={50}
        />
      </div>
      <div className="my-2 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <p className="font-light">52</p>
            <FiMessageSquare size={24} className="fill-gray-200 stroke-none" />
          </div>
          <div className="flex items-center gap-1">
            <p className="font-light">52</p>
            <FiHeart size={24} className="fill-gray-200 stroke-none" />
          </div>
        </div>
        <div className="flex gap-3">
          <FiSend size={24} className="fill-gray-200 stroke-none" />
          <FiBookmark size={24} className="fill-gray-200 stroke-none" />
          <FiMoreHorizontal size={24} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="leading-[1.4] text-gray-300">
          {spot.description}
        </p>
        <p>{spot.location}</p>
      </div>
    </div>
  );
};
export default SpotCard;
