import {useDispatch, useSelector} from "react-redux";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      {anecdote.content}
      <div>
        has {anecdote.votes} &nbsp;
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  const vote = (id) => {
    dispatch({
      type: 'anecdote/addVote',
      payload: id
    })
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      )}
    </>
  )
}

export default AnecdoteList