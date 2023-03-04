
interface Props {
  children: React.ReactNode
}
const Container: React.FC<Props> = ({ children }) => {
  return <div className="min-w-screen min-h-screen h-full bg-neutral-900 relative">{children}</div>;
};

export default Container;
