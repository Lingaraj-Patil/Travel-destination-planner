import React from "react";

interface DestinationCardProps{
    id:number;
    name: string;
    country: string;
    description: string;
    image: string;
    isFavourite: boolean;
    onToggleFavourite: (id:number) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ id,name,country,description,image,isFavourite,onToggleFavourite}) =>{
    return (
        <div className="border rounded-lg shadow-lg overflow-hidden">
            <img src={image} alt={name} className="w-full h-48 object-cover"/>
            <div className="p-4">
                <h2 className="font-bold text-xl">{name}</h2>
                <h3 className="text-gray-600">{country}</h3>
                <p className="mt-2">{description}</p>
                <button
                    onClick={() => onToggleFavourite(id)}
                    className={`mt-4 p-2 rounded-lg ${isFavourite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700' }`}
                >
                    {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                </button>
            </div>
        </div>
    )
}

export default DestinationCard