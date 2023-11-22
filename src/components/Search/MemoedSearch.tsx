import React from 'react';

interface Props {
    countryName: string;
    searchCountry: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MemoedSearch: React.FC<Props> = React.memo(function Search({searchCountry, countryName}) {
    return (
        <form className="w-full mb-3">
            <input
                value={countryName}
                className="border p-2 w-full outline-0 border-gray-300"
                onChange={searchCountry}
                placeholder="Enter Canada"
                type="text"
            />
        </form>
    );
}, (prevProps, nextProps) => {
    return prevProps.countryName === nextProps.countryName;
});

export default MemoedSearch;