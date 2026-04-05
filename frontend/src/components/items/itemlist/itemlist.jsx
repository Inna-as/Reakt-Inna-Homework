import { useState, useEffect } from 'react'
import axios from 'axios'
import ItemCard from '../itemCard/itemCard' 
import styles from './itemlist.module.css'
import AddItem from '../Forms/Additem/Additem'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const ItemList = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleAddItem = (newItem) => {
    setItems((prev) => [newItem, ...prev])
  }

  const handleUpdateItem = async (id, updatedData) => {
    try {
      const response = await axios.patch(`${API_URL}/items/${id}`, updatedData)
      setItems((prev) => 
        prev.map((item) => (item.id === id ? { ...item, ...response.data } : item))
      )
    } catch (err) {
      console.error("Ошибка при обновлении:", err)
      alert("Не удалось обновить данные.")
    }
  }

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Удалить этот автомобиль из гаража?")) return

    try {
      await axios.delete(`${API_URL}/items/${id}`)
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error("Ошибка при удалении:", err)
      alert("Не удалось удалить элемент.")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${API_URL}/items`)
        const data = Array.isArray(res.data) ? res.data : (res.data.items || [])
        setItems(data)
      } catch (err) {
        setError(`Ошибка загрузки: ${err.response?.statusText || err.message}`)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список автомобилей</h1>
      
      <AddItem onAdd={handleAddItem} />

      <hr className={styles.divider} />

      <ul className={styles.list}>
        {items.map(item => (
          <ItemCard 
            key={item.id || item._id || Math.random()} 
            item={item} 
            onUpdate={handleUpdateItem}
            onDelete={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  )
}

export default ItemList
