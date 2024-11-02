import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [query,setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setQuery(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <div className="p-4">
            <input
                type="text"
                value= {query}
                onChange={handleInputChange}
                placeholder="Search destinations..."
                className="border rounded-lg p-2 w-full"
            />
        </div>
    )
}

export default SearchBar