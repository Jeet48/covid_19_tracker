import React, {useState} from "react";

import {useEffect} from "react";

import { MenuItem,  Select ,FormControl, Card } from '@mui/material';

import './App.css';

import InfoBox from './InfoBox';

import Map from './Map';
import { CardContent} from "@material-ui/core";
import Table from "./Table";
import './Table.css';
import { sortData } from "./util";

function App() {

  const [countries, setCountries] = useState(["USA", "UK", "INDIA"]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

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

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      })
    }
     
      getCountriesData();

  },[]); 


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);

    const url = countryCode ==='worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    })

    //https://disease.sh/v3/covid-19/all
    //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  };

  console.log(countryInfo);

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
      <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>

      <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

      <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
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
          <Table countries={tableData} />
        <h3>World wide cases</h3>
      </CardContent>
   </Card>
    </div>
  );
}

export default App;
