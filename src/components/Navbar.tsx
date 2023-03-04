import { useSession } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-50 p-4">
      {/* Mobile */}
      <div className="flex h-full w-full sm:hidden">
        <div className="text-2xl text-gray-200">Recur</div>
      </div>
    </div>
  );
};

export default Navbar;
