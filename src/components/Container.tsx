import { FiPlusCircle } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
interface Props {
  children: React.ReactNode;
}
const Container: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="min-w-screen relative h-full min-h-screen bg-neutral-800">
      {children}
      <div className="absolute bottom-0 bg-neutral-900 flex w-full items-center justify-center py-4 px-2">
        {router.route !== "/upload" ? (
          <Link href={'/upload'}>
            <FiPlusCircle size={34} className=" text-gray-200" />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Container;
