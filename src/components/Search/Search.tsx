import React from 'react';

interface Props {
    searchCountry: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({searchCountry}) => {
    return (
        <form className="w-full mb-3">
            <input
                className="border p-2 w-full outline-0 border-gray-300"
                onChange={searchCountry}
                placeholder="Enter Canada"
                type="text"
            />
        </form>
    );
};

export default Search;