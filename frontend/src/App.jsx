import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/UI/Header' 
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {

    axios.get(`${API_URL}/items`)
      .then(response => {
       
        const data = Array.isArray(response.data) ? response.data : response.data.items;
        setItems(data || []);
      })
      .catch(error => console.error("Ошибка при получении данных:", error))
  }, [])

  return (
    <>
      <Header />

      <h1>Список вещей</h1>
      <ul>
        {items.length > 0 ? (
          items.map(item => (
            <li key={item.id}>
              <strong>{item.name}</strong>: {item.description} — 
              <span> {item.isAvailable ? "✅ В наличии" : "❌ Нет в наличии"}</span>
            </li>
          ))
        ) : (
          <p>Загрузка или список пуст...</p>
        )}
      </ul>
    </>
  )
}


export default App 
