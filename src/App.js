import React, {useState} from "react";

import {useEffect} from "react";

import { MenuItem,  Select ,FormControl, Card } from '@mui/material';

import './App.css';

import InfoBox from './InfoBox';

import Map from './Map';
import { CardContent } from "@material-ui/core";

function App() {

  const [countries, setCountries] = useState(["USA", "UK", "INDIA"]);
  const [country, setCountry] = useState('worldwide');


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


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  }

  return (
  <div className="app">
   <div className="app__left">
   <div className="app__header">
    <h1>COVID-19 TRACKER</h1>
    <FormControl className="app__dropdown">
      <Select variant="outlined" onChange = {onCountryChange} value={country}>
       <MenuItem value="worldwide">Worldwide</MenuItem>
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
  

    <div className="app__stats">
      <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>

      <InfoBox title="Recovered" cases={1243} total={3000}/>

      <InfoBox title="Deaths" cases={12378} total={4000}/>
    {/* InfoBoxs */}
    {/* InfoBoxs */}
    {/* InfoBoxs */}
    </div>
    {/*Table */}
    {/*Graph */}

    {/*Map */}
   </div>
   <Card className="app_right">
      <CardContent>
        <h3>Live Cases by Country</h3>

        <h3>World wide cases</h3>
      </CardContent>
   </Card>
    </div>
  );
}

export default App;
