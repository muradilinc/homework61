import React, {useCallback, useEffect, useState} from 'react';
import {Country} from '../../types';
import axios from 'axios';
import {ALPHA_URL} from '../../constanst/constanst';
import Loader from '../Loader/Loader';

interface Props {
  country: Country;
}

const CountryInfo: React.FC<Props> = ({country}) => {
  const [description, setDescription] = useState<string>('');
  const [borders, setBorders] = useState<string[]>([]);
  const [preloader, setPreLoader] = useState<boolean>(true);

  const fetchDescription = useCallback(async () => {
    try {
      const description = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&exlimit=1&origin=*&explaintext=1&exsentences=10&formatversion=2&prop=extracts&titles=${country.name}&format=json`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        }
      });
      setDescription(description.data.query.pages[0].extract);
    } catch (error) {
      alert('Error ' + error);
    }
  }, [country.name]);

  useEffect(() => {
    void fetchDescription();
  }, [country, fetchDescription]);


  useEffect(() => {
    const fetchBorder = async () => {
      if (country.borders) {
        const borders = await Promise.all(country.borders.map(async (border) => {
          try {
            setPreLoader(true);
            const response = await axios.get(ALPHA_URL + border);
            return response.data.name;
          } catch (error) {
            alert('Error ! ' + error);
          }
        }));

        setBorders(borders);
      } else {
        setBorders([]);
      }
      setPreLoader(false);
    };

    void fetchBorder();
  }, [country]);

  return (
    <>
      {
        country ?
          <div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-6xl">{country.name}</h3>
                <div className="text-2xl flex flex-col mt-auto">
                  <p><strong>Capital: </strong>{country.capital}</p>
                  <p><strong>Population: </strong>{country.population}</p>
                  {
                    country.currencies && <p>
                      <strong>Currency: </strong>{country.currencies[0].name + ' ' + country.currencies[0].symbol}
                    </p>
                  }
                </div>
              </div>
              <div className="w-[40%] border border-black">
                <img className="w-full max-h-[300px]" src={country.flag} alt="Флаг страны"/>
              </div>
            </div>
            <div className="mt-5">
              {
                preloader ?
                  <Loader status={preloader}/>
                  :
                  <p className="text-2xl">
                    <strong>Description: </strong>{description ? description : 'No description'}</p>
              }
              <div className="mt-8">
                <h4 className="font-bold text-3xl">Border with:</h4>
                {
                  borders.length !== 0 ?
                    <ul className="list-disc ml-7">
                      {
                        borders.map((border) => <li key={border}>{border}</li>)
                      }
                    </ul>
                    :
                    <h4 className="text-2xl">No borders</h4>
                }
              </div>
            </div>
          </div>
          :
          <h1>select country</h1>
      }
    </>
  );
};

export default CountryInfo;