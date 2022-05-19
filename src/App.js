import React, {useState} from "react";

import {useEffect} from "react";

import { MenuItem,  Select ,FormControl } from '@mui/material';

import './App.css';

function App() {

  const [countries, setCountries] = useState(["USA", "UK", "INDIA"]);
  


  useEffect(() => {

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=> {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }
        ))
        setCountries(countries);
      })
    }
     
      getCountriesData();

  },[]); 


  return (
  <div className="app">
    <div className="app__header">
    <h1>COVID-19 TRACKER</h1>
    <FormControl className="app__dropdown">
      <Select
        variant="outlined"
        value="abc"
      >
      {/* Loop through all the countries and show a drop down list of option */}
          
          {
            countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }

        {/* <MenuItem value="worldwide">Worldwide</MenuItem>
        <MenuItem value="worldwide">Worldwide</MenuItem>
        <MenuItem value="worldwide">Worldwide</MenuItem>
        <MenuItem value="worldwide">Worldwide</MenuItem> */}
    </Select>
    </FormControl>
    </div>
   

    {/*Header */}
    {/*Title + select input dropdown field*/}

    {/* InfoBoxs */}
    {/* InfoBoxs */}
    {/* InfoBoxs */}

    {/*Table */}
    {/*Graph */}

    {/*Map */}
    </div>
  );
}

export default App;
