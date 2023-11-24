const CountriesList = ({ countries }) => {
  return (
    <>{countries.map((country) => <div key={country.name.common}>{country.name.common}</div>)}</>
  )
}

export default CountriesList