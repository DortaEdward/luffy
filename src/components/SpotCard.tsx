import img from "../img.jpg";
import Image from "next/image";
import { FiHeart, FiMessageSquare, FiSend, FiBookmark, FiMoreHorizontal } from "react-icons/fi";
const SpotCard = () => {
  return (
    <div className="w-[360px] shadow-2xl p-2 rounded-md bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-10">
      <div className="my-2 flex items-center justify-between text-gray-200">
        <div className="flex items-center gap-2">
          <Image
            src={img}
            alt={"Author"}
            width={36}
            height={36}
            className="h-[40px] w-[40px] rounded-full"
          />
          <div className="leading-[1.2]">
            <p className="font-medium">Aaron Brimhall</p>
            <p className="text-[0.8rem]">Aug 30, 2022</p>
          </div>
        </div>
        <div>
          <FiHeart size={32} className="stroke-2" />
        </div>
      </div>
      <div className="mx-auto w-[340px]">
        <Image
          src={img}
          alt={"picture of the city"}
          className="h-full w-full object-cover"
        />
      </div>
      <div className=" text-gray-200 my-2 flex items-center justify-between">
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
      <div>
        <p className="leading-[1.4] text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis harum temporibus corporis veritatis laborum atque aspernatur nihil porro.
        </p>
        </div>
    </div>
  );
};
export default SpotCard;
