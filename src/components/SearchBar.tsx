// SearchBar component
import type React from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const dispatch = useAppDispatch();
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        //dispatch(searchAddOns(searchTerm));
        setSearchTerm('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search add-ons...'
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;