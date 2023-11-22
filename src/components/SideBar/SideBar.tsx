import React, {useEffect, useState} from 'react';
import {Country} from '../../types';
import Loader from '../Loader/Loader';
import MemoedSearch from "../Search/MemoedSearch";

interface Props {
  countries: Country[];
  selectCountry: (alpha: string) => void;
  countryName: string;
  searchCountry: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SideBar: React.FC<Props> = ({countries, selectCountry, searchCountry, countryName}) => {
  const [preloader, setPreLoader] = useState<boolean>(true);
  console.log("render");

  useEffect(() => {
    if (countries.length !== 0) {
      setPreLoader(false);
    }
  }, [countries.length]);

  return (
    <div className="border border-black overflow-auto h-screen p-2">
      <MemoedSearch countryName={countryName} searchCountry={searchCountry}/>
      {
        preloader ?
          <Loader status={preloader}/>
          :
          countries.map((country) =>
            <p
              key={country.name}
              className="text-2xl cursor-pointer"
              onClick={() => selectCountry(country.alpha2Code)}>{country.name}
            </p>
          )
      }
    </div>
  );
};

export default SideBar;