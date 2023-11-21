import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticsLine = ({ text, value }) => {
  return <p>{text} {value}</p>
}

const Statistics = ({ good, neutral, bad }) => {
  const calculateAverage = (good, neutral, bad) => (
    (good + (bad * -1)) / (good + neutral + bad)
  )

  const calculatePositive = (good, neutral, bad) => (
    (good / (good + neutral + bad)) * 100
  )

  if (good + neutral + bad > 0) {
    return (
      <>
        <h1>statistics</h1>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="average" value={calculateAverage(good, neutral, bad)} />
        <StatisticsLine text="positive" value={calculatePositive(good, neutral, bad)} />
      </>
    )
  } else {
    return <p>no feedback given</p>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App