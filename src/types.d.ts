interface Currency {
  name: string;
  symbol: string;
}

export interface Country {
  alpha2Code: string;
  name: string;
  capital: string;
  borders: string[];
  flag: string;
  region: string;
  timezones: string[];
  population: number;
  currencies: Currency[];
}