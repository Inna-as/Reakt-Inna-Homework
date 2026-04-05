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

  useEffect(() => {
    axios.get(`${API_URL}/items`)
      .then(res => {
        setItems(Array.isArray(res.data) ? res.data : (res.data.items || []))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
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
          <ItemCard key={item.id || item._id || Math.random()} item={item} />
        ))}
      </ul>
    </div>
  )
}

export default ItemList
