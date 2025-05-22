import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const increaseVote = (index) => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
  }

  const getMostVotes = () => {
    var highestIndex = 0
    for (let index = 1; index < votes.length; index++) {
      if (votes[index] > votes[highestIndex]) {
        highestIndex = index
      }
    }
    console.log(highestIndex)
    return highestIndex
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => increaseVote(selected)}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      <h1>anecdote with most votes</h1>
      <p>{anecdotes[getMostVotes()]}</p>
      <p>has {votes[getMostVotes()]} votes</p>
    </div>
  )
}

export default App