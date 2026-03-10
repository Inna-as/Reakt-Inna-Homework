import { useState } from 'react'
import Header from './components/UI/Header/Header'

function App() {
  const [count, setCount] = useState(0)

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <>
      <Header />
      <h1>Счетчик кликов</h1>
      <div>
        <p>Текущее значение: {count}</p>
        
        <button onClick={() => setCount(count + 1)}>
          +1
        </button>

        <button onClick={handleDecrement}>
          -1
        </button>

        <button onClick={() => setCount(0)}>
          Сбросить
        </button>
      </div>
    </>
  )
}

export default App
