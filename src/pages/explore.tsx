import { trpc } from "../utils/trpc";
import SpotContainer from "../components/SpotContainer";
const Explore = () => {
  const {data, isLoading, error} = trpc.spot.exploreFeed.useQuery();
  console.log(data);
  if(isLoading) return<>Loading</>
  return <div className="w-full">
    <SpotContainer spots={data} />
  </div>
}
export default Explore;