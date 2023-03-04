import { FiPlusCircle } from "react-icons/fi";
interface Props {
  children: React.ReactNode;
}
const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-w-screen relative h-full min-h-screen bg-gray-600">
      {children}
      <div className="w-full py-2 px-2 absolute bottom-0 flex items-center justify-center">
        <FiPlusCircle
          size={34}
          className=" text-gray-200"
        />
      </div>
    </div>
  );
};

export default Container;
