import React from "react";
import DestinationCard from "./DestinationCard";

interface Destination{
    id: number;
    name: string;
    country: string;
    description: string;
    image: string;
}

interface DestinationListProps{
    destinations: Destination[];
    onToggleFavourite: (id:number) => void;
    favourites: number[];
}

const DestinationList: React.FC<DestinationListProps> = ({destinations,onToggleFavourite,favourites}) => {
    
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {destinations.map((destination)=>(
                <DestinationCard
                    key={destination.id}
                    id={destination.id}
                    name={destination.name}
                    country={destination.country}
                    description={destination.description}
                    image={destination.image}
                    isFavourite={favourites.includes(destination.id)}
                    onToggleFavourite={onToggleFavourite}
                />
            )) }
        </div>
    )
}

export default DestinationList;