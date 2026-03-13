import { useState } from 'react'
import Header from './components/UI/Header/Header'
import Footer from './components/UI/Header/Footer'
function App() {
  const [count, setCount] = useState(0)

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <div className="app-container">
      <Header title="Мой сайт" text="Добро пожаловать!" />

      <main>
        <h1>Счетчик кликов</h1>
        <p>Текущее значение: {count}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={handleDecrement}>-1</button>
        <button onClick={() => setCount(0)}>Сбросить</button>
      </main>

      <Footer copyright="Мой проект" info="Учебная версия" />
    </div>
  )
}

export default App