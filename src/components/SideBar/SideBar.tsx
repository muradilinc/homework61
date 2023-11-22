import React, {useEffect, useState} from 'react';
import {Country} from '../../types';
import Loader from '../Loader/Loader';
import Search from "../Search/Search";

interface Props {
  countries: Country[];
  selectCountry: (alpha: string) => void;
  searchCountry: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SideBar: React.FC<Props> = ({countries, selectCountry, searchCountry}) => {
  const [preloader, setPreLoader] = useState<boolean>(true);

  useEffect(() => {
    if (countries.length !== 0) {
      setPreLoader(false);
    }
  }, [countries.length]);

  return (
    <div className="border border-black overflow-auto h-screen p-2">
      <Search searchCountry={searchCountry}/>
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