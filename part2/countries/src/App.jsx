import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries, selectNewCountry }) => {
  return (
    <div>
    {countries.map((country) =>
      <div key={country.name.common}>
        {country.name.common + " "}
        <button onClick={() => selectNewCountry(country.name.common)}>Show</button>
      </div>
    )}
  </div>);
}

const Country = ({ countryInfo }) => {
  return (
    <div>
      <h1>{countryInfo.name.official}</h1>
      <p>
        Capital {countryInfo.capital}<br/>
        Area {countryInfo.area}
      </p>

      <h1>Languages</h1>
      <ul>
        {Object.values(countryInfo.languages).map(val => <li key={val}>{val}</li>)}
      </ul>
      <img src={countryInfo.flags.png}/>
    </div>
  )
}

const Countries = ({ newCountry, filteredCountries, selectNewCountry, selectedCountry }) => {
  console.log(selectedCountry)
  if (newCountry == "") {
    return null;
  }
  else if (Object.keys(selectedCountry).length > 0) {
    return <Country countryInfo={selectedCountry} />;
  } else if (filteredCountries.length === 1) {
    return <Country countryInfo={filteredCountries[0]} />
  } else {
    return <CountryList countries={filteredCountries} selectNewCountry={selectNewCountry} />;
  }
}

function App() {

  const [newCountry, setNewCountry] = useState('');
  const [countriesList, setCountriesList] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(countriesList => {
        setCountriesList(countriesList.data)
      })
  }, []);

  const handleNewCountry = (event) => {
    const toSearch = event.target.value.toLowerCase();
    const newFilteredCountries = [];

    setSelectedCountry({});
    setNewCountry(toSearch);

    // search for the country's name
    for (const i in countriesList) {
      if (countriesList[i].name.common.toLowerCase().includes(toSearch.toLowerCase())) {
        newFilteredCountries.push(countriesList[i]);
      }
    }

    setFilteredCountries(newFilteredCountries);
  }

  const selectNewCountry = (countryName) => {
    for (const i in countriesList) {
      if (countriesList[i].name.common.toLowerCase() === countryName.toLowerCase()) {
        setSelectedCountry(countriesList[i]);
        break;
      }
    }
  }

  return (
    <>
      <div>
        find countries
        <input onChange={handleNewCountry}/>
      </div>
      <Countries newCountry={newCountry} filteredCountries={filteredCountries} countriesList={countriesList} selectedCountry={selectedCountry} selectNewCountry={selectNewCountry} />
    </>
  )
}

export default App
