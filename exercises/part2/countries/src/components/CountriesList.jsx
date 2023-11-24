import { useState } from 'react'
import CountryInfo from './CountryInfo'

const CountriesListItem = ({ country }) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div>
      {country.name.common}
      <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'hide' : 'show'}</button>
      {showInfo && <CountryInfo country={country} />}
    </div>
  )
}

const CountriesList = ({ countries }) => {
  return (
    <>{countries.map((country) => <CountriesListItem key={country.name.common} country={country} />)}</>
  )
}

export default CountriesList