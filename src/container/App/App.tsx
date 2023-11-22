import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ALPHA_URL, BASE_URL} from '../../constanst/constanst';
import {Country} from '../../types';
import SideBar from '../../components/SideBar/SideBar';
import CountryInfo from '../../components/CountryInfo/CountryInfo';

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | undefined>();
  const [countryName, setCountryName] = useState<string>('');

  const fetchCountry = async (alpha: string) => {
    try {
      const countryResponse = await axios.get(ALPHA_URL + alpha);
      setCountry(countryResponse.data);
    } catch (error) {
      alert('Error ' + error);
    }
  };

  const fetchCountries = async () => {
    try {
      const countryResponse = await axios.get(BASE_URL);
      setCountries(countryResponse.data);
    } catch (error) {
      alert('Error ' + error);
    }
  };

  useEffect(() => {
    void fetchCountries();
  }, []);

  useEffect(() => {
    if (!countryName) {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country =>
          country.name.toLowerCase().includes(countryName.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [countryName, countries]);

  const searchCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryName(event.target.value);
  };


  return (
    <div className="container mx-auto grid grid-cols-3 my-5 gap-2">
      <div className="col-start-1">
        <SideBar
            countryName={countryName}
            searchCountry={searchCountry}
            countries={filteredCountries}
            selectCountry={fetchCountry}
        />
      </div>
      <div className="col-span-2 border border-black p-3">
        {
          country ?
            <CountryInfo country={country}/>
            :
            <div className="flex justify-center items-center h-full">
              <h2 className="p-2 px-4 text-white bg-gray-400 rounded-3xl">Select please a country!!!</h2>
            </div>
        }
      </div>
    </div>
  );
};

export default App;