import SpotCard from "./SpotCard";

type Author = {
  id:string;
  image:string;
  name:string;
};

type Spot = {
  id: string;
  authorId: string;
  description: string;
  location: string;
  image_url: string;
  cords: string | null;
  createAt: Date;
  image_public_id: string;
  mark_for_deletion: string;
  updatedAt: Date;
};

type Props = {
  spots: Spot[],
}

const SpotContainer = ({spots}: any) => {
  return (
  <div className="flex flex-col flex-wrap justify-center sm:flex-row gap-4 p-6">
    {
      spots.map((spot: any) => {
        return(
          <SpotCard key={spot.id} spot={spot} />
        )
      })
    }
  </div>)
}

export default SpotContainer;