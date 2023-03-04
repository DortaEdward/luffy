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
      {router.route !== "/upload" ? (
        <div className="absolute bottom-0 flex w-full items-center justify-center bg-neutral-900 py-4 px-2">
          <Link href={"/upload"}>
            <FiPlusCircle size={34} className=" text-gray-200" />
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Container;
