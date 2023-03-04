import { useSession } from "next-auth/react";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-50 p-4">
      {/* Mobile */}
      <div className="flex items-center justify-between h-full w-full sm:hidden">
        <div className="text-2xl text-gray-200">Recur</div>
        <div className="flex gap-2">
          {session && <Image className="rounded-full" width={28} height={28} src={session.user?.image as string} alt={`Image of ${session.user?.name}`}/>}
          <FiMenu size={28} className="text-gray-200 cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
