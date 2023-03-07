import { FiPlusCircle } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
interface Props {
  children: React.ReactNode;
}
const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-w-screen relative h-full min-h-screen bg-neutral-900">
      {children}
    </div>
  );
};

export default Container;
