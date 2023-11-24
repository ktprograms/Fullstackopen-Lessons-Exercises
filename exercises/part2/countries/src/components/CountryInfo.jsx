const CountryInfo = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.keys(country.languages).map((languageCode) => <li key={languageCode}>{country.languages[languageCode]}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} height={200}></img>
    </>
  )
}

export default CountryInfo