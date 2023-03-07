/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import {
  FiHeart,
  FiMessageSquare,
  FiSend,
  FiBookmark,
  FiMoreHorizontal,
} from "react-icons/fi";

const SpotCard = ({ spot }: any) => {
  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    // need a visual to show user that url has been copied
  };

  return (
    <div className="w-[320px] rounded-md bg-gray-400 bg-opacity-10 bg-clip-padding px-5 py-2 text-gray-200 shadow-2xl backdrop-filter">
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
            <Link href={`/user/${spot.authorId}`} className="font-medium">
              {spot.author.name}
            </Link>
            <p className="text-[0.8rem]">Aug 30, 2022</p>
          </div>
        </div>
        <div>
          <FiHeart size={28} className="stroke-2" />
        </div>
      </div>
      <Link
        href={`/spot/${spot.id}`}
        className="flex w-full items-center justify-center"
      >
        <img
          src={spot.image_url}
          alt={"picture of the city"}
          className="aspect-square w-[350px] object-cover"
          width={50}
          height={50}
        />
      </Link>
      <div className="mt-2 mb-1 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <p className="text-xs font-light">{0}</p>
            <FiMessageSquare size={20} className="fill-gray-200 stroke-none" />
          </div>
          <div className="flex items-center gap-1">
            <p className="text-xs font-light">0</p>
            <FiHeart size={20} className="fill-gray-200 stroke-none" />
          </div>
        </div>
        <div className="flex gap-3">
          <FiSend
            onClick={() => copyUrl(`http://localhost:3000/spots/${spot.id}`)}
            size={20}
            className="fill-gray-200 stroke-none cursor-pointer"
          />
          <FiBookmark size={20} className="fill-gray-200 stroke-none" />
          <FiMoreHorizontal size={20} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm leading-[1.4] text-gray-300">
          {spot.description}
        </p>
        <p className="text-xs">{spot.location}</p>
      </div>
    </div>
  );
};
export default SpotCard;
