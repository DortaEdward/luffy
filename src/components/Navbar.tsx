import { useSession } from "next-auth/react";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-50 p-4">
      <div className="flex h-full w-full items-center justify-between sm:hidden">
        <div className="flex gap-2">
          <FiMenu size={28} className="cursor-pointer text-gray-200" />
          <div className="text-2xl text-gray-200">Recur</div>
        </div>
        {session && (
          <Image
            className="rounded-full"
            width={28}
            height={28}
            src={session.user?.image as string}
            alt={`Image of ${session.user?.name}`}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
