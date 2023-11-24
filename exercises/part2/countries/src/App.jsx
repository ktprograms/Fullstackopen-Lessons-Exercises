import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryInfo from './components/CountryInfo'
import CountriesList from './components/CountriesList'

const App = () => {
  const [allCountries, setAllCountries] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setAllCountries(response.data)
      })
  }, [])
  if (!allCountries) {
    return 'loading...' // TODO: Surely this isn't best practice?
  }

  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )
  console.log(filteredCountries)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <div>
        find countries
        <input value={filter} onChange={handleFilterChange} />
      </div>
      {
        filteredCountries.length === 0
          ? 'No matches, specify another filter'
          : filteredCountries.length === 1
            ? <CountryInfo country={filteredCountries[0]} />
            : filteredCountries.length <= 10
              ? <CountriesList countries={filteredCountries} />
              : 'Too many matches, specify another filter'
      }
    </>
  )
}

export default App