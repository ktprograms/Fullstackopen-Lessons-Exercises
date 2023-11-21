import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const calculateAverage = (good, neutral, bad) => (
    (good + (bad * -1)) / (good + neutral + bad)
  )

  const calculatePositive = (good, neutral, bad) => (
    (good / (good + neutral + bad)) * 100
  )

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>average {calculateAverage(good, neutral, bad)}</p>
      <p>positive {calculatePositive(good, neutral, bad)}%</p>
    </div>
  )
}

export default App