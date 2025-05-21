import { useState } from 'react'

const Feedback = () => {
  return (
    <h1>give feedback</h1>
  )
}

const StatisticLine = ({ text, value }) => {
  return (<tr><td>{text}</td><td>{value}</td></tr>)
}

const Button = ({ handleClick, label }) => {
  return (<button onClick={() => handleClick()}>{ label }</button>)
}

const Statistics = ({ good, neutral, bad, score, count }) => {

  if (count == 0) {
    return <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}></StatisticLine>
          <StatisticLine text="neutral" value={neutral}></StatisticLine>
          <StatisticLine text="bad" value={bad}></StatisticLine>
          <StatisticLine text="all" value={good + bad + neutral}></StatisticLine>
          <StatisticLine text="average" value={score / count}></StatisticLine>
          <StatisticLine text="positive" value={ (good / count) * 100 + "%"}></StatisticLine>
        </tbody>
      </table>
    </>
  );
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)

  const updateGood = () => {
    setGood(good + 1)
    setCount(count + 1)
    setScore(score + 1)
  }

  const updateNeutral = () => {
    setNeutral(neutral + 1)
    setCount(count + 1)
  }

  const updateBad = () => {
    setBad(bad + 1)
    setCount(count + 1)
    setScore(score - 1)
  }


  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={updateGood} label="good"></Button>
      <Button handleClick={updateNeutral} label="neutral"></Button>
      <Button handleClick={updateBad} label="bad"></Button>
      <Statistics good={good} bad={bad} neutral={neutral} count={count} score={score}></Statistics>
    </>
  )
}

export default App