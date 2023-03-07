import type { RouterOutputs } from "../utils/trpc";
import SpotCard from "./SpotCard";

type Props = {
  spots: RouterOutputs["spot"]["getSpots"];
};

const SpotContainer = ({ spots }: Props) => {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {spots.map((spot) => {
        return (
          <>
            <SpotCard key={spot.id} spot={spot} />
          </>
        );
      })}
    </div>
  );
};

export default SpotContainer;
