import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, InputLabel} from "@material-ui/core";
import './App.css';
import InfoBox from './InfoBox';


function App() {
  //! STATE
  const [ countries, setCountries ] = useState([]);
  const [ country, setCountry ] = useState('worldwide');


  //? Disease Api
//? https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    const  getCountriesData = async()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then(res => res.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        setCountries(countries);
      });
    };
    getCountriesData();
  }, [countries]);

  const onCountryChange = (e)=>{
    const countryCode = e.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__header">
    {/* Header */}
        <h1>COVID-19 Tracker</h1>
        {/* title + drop down */}
        <FormControl className="app__dropdown">
          <InputLabel  id="thing" >Country</InputLabel>
          <Select
          labelId="thing"
          variant="outlined"
          value={country} onChange={}>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
        {/* Map through countries */}
            {countries.map(country =>{
              return <MenuItem value={country.value}>{country.name}</MenuItem>
            })}
          </Select>
        </FormControl> 
      </div>
      <div className="app__stats">
            <InfoBox title="Coronavirus Cases" />
            
            <InfoBox title="Recovered" />
            
            <InfoBox title="Deaths" />
      </div>
    </div>
  );
};

export default App;
