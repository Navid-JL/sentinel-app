import { useState } from 'react'

function App() {
  const [state, setState] = useState({
    count: 1,
    name: 'navid',
    role: 'user',
  })

  return (
    <>
      <div>{state.role}</div>
      <div>{state.name}</div>
      <div>{state.count}</div>
      <button
        style={{
          padding: '0.5rem 1rem',
          cursor: 'pointer',
        }}
        onClick={() => {
          setState({ ...state, count: state.count + 1 })
        }}
      >
        Add
      </button>
      {/* <button></button>
      <button></button> */}
    </>
  )
}

export default App
