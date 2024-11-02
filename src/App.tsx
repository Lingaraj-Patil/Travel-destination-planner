import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import DestinationList from "./components/DestinationList";
import MysoreImage from "./assets/India.jpg"
import MoscowImage from "./assets/russia.jpg"
import KalaburagiImage from "./assets/kalaburagi.jpeg"
import BengaluruImage from "./assets/bengaluru.jpeg"
import NewYorkImage from "./assets/newYork.jpeg"
import LondonImage from "./assets/London.jpeg"
import TokyoImage from "./assets/Tokyo.jpeg";

const App: React.FC = () => {
  const [searchQuery,setSearchQuery] = useState('');
  const [selectedCountry,setSelectedCountry] = useState('All');
  const [sortOptions,setSortOptions] = useState('None');
  const [favourites,setFavourites] = useState<number[]>([]);
  const [showFavourite,setShowFavourite] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setSortOptions(event.target.value);
  }

  const handleToggleFavourites = (id:number) => {
    setFavourites((prevFavourites)=>
      prevFavourites.includes(id) ? prevFavourites.filter((favId) => favId !== id) : [...prevFavourites,id]
    )
  }

  const toggleShowFavourites = () => {
    setShowFavourite(!showFavourite);
  }  

  const destinations =[
    {
        id:1,
        name: "Mysore",
        country: "India",
        description: "The city of Palaces",
        image: MysoreImage
    },
    {
        id:2,
        name: "Moscow",
        country: "Russia",
        description: "Capital city of Russia",
        image: MoscowImage
    },
    {
        id:3,
        name: "Kalaburagi",
        country: "India",
        description: "City of Flowers and Gardens",
        image: KalaburagiImage
    },
    {
        id:4,
        name: "Bengaluru",
        country: "India",
        description: "Garden city of India",
        image: BengaluruImage
    },
    {
        id:5,
        name: "New York",
        country: "United States of America",
        description: "The city that never sleeps",
        image: NewYorkImage
    },
    {
        id:6,
        name: "London",
        country: "United Kingdom",
        description: "The Square mile",
        image: LondonImage
    },
    {
        id:7,
        name: "Tokyo",
        country: "Japan",
        description: "Edo",
        image: TokyoImage
    }

  ];

  const filteredDestinations = destinations
    .filter((destination) =>{
        const matchesSearch = destination.name.toLowerCase().includes(searchQuery)||destination.country.toLowerCase().includes(searchQuery)
        const matchesCountry = selectedCountry === 'All' || destination.country === selectedCountry;
        return matchesCountry && matchesSearch;
      })
    .filter((destination)=>(showFavourite ? favourites.includes(destination.id) : true));
  

  const sortedDestinations = [...filteredDestinations].sort((a,b) =>{
    if(sortOptions === 'Name'){
      return a.name.localeCompare(b.name);
    }
    else if(sortOptions === 'Country'){
      return a.country.localeCompare(b.country); 
    }
    return 0;
  })

  const uniqueCountries = ['All', ...new Set(destinations.map((destination) => destination.country))]

  return(
    <div className="App">
      <header className="bg-blue-500 text-white p-4 text-center font-bold text-2xl"> 
        Travel Destination Planner
      </header>
      <SearchBar onSearch={handleSearch}/>
      <div className="p-4"> 
        <label htmlFor="country-filter" className="block mb-2">Filter By Country:</label>
        <select
          id="country-filter"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="border rounded-lg p-2 w-full"
        >
          {uniqueCountries.map((country)=>(
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <label htmlFor="sort-filter" className="block mb-2">Sort By:</label>
        <select
          id="sort-filter"
          value={sortOptions}
          onChange={handleSortChange}
          className="border rounded-lg p-2 w-full"
          >
            <option value="None">None</option>
            <option value="Name">Name</option>
            <option value="Country">Country</option>
          </select>
          <button
            onClick={toggleShowFavourites}
            className="bg-green-500 text-white p-2 rounded-lg w-full mb-4"
          >
            {showFavourite ? 'Show All Destinations' : 'Show Favourites only'}
          </button>
      </div>
      <DestinationList 
        destinations={sortedDestinations}
        onToggleFavourite={handleToggleFavourites}
        favourites={favourites} 
      />
    </div>
  )
}

export default App