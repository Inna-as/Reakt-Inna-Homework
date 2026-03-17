import { useState, useEffect } from 'react'
import Header from './components/UI/Header/Header'
import Footer from './components/UI/Header/Footer'

function App() {
  const [count, setCount] = useState(0)
  const [isFooterVisible, setIsFooterVisible] = useState(true)

  useEffect(() => {
    alert("Привет!")
  }, [])

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
        
        <br />
        
        <button onClick={() => setIsFooterVisible(!isFooterVisible)}>
          {isFooterVisible ? 'Скрыть футер' : 'Показать футер'}
        </button>
      </main>

      {isFooterVisible && <Footer copyright="Мой проект" info="Учебная версия" />}
    </div>
  )
}

export default App
