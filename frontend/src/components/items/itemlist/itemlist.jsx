import { useState, useEffect } from 'react'
import axios from 'axios'
import ItemCard from '../itemCard/itemCard' 

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const ItemList = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    axios.get(`${API_URL}/items`)
      .then(response => {
        const cars = Array.isArray(response.data) 
          ? response.data 
          : (response.data.items || [])
          
        setItems(cars)
        setLoading(false)
      })
      .catch(err => {
        console.error("ОШИБКА AXIOS:", err)
        setError(`Не удалось загрузить авто: ${err.message}`)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-4">Загрузка машин...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <div className="item-list" style={{ padding: '20px' }}>
      <h1>Список автомобилей</h1>
      
      {items.length === 0 ? (
        <p>Машин пока нет в гараже</p>
      ) : (
        <ul style={{ padding: 0 }}>
          {items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ItemList
