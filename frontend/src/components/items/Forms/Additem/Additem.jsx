import { useState } from 'react'
import axios from 'axios'
import styles from './Additem.module.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const AddItem = ({ onAdd }) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [isAvailable, setIsAvailable] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(`${API_URL}/items`, { 
                name, 
                description, 
                isAvailable 
            })
            
            if (onAdd) onAdd(response.data)

            // Сброс формы
            setName("")
            setDescription("")
            setIsAvailable(false)
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder='Название' 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
            />
            <textarea 
                placeholder='Описание' 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
            />
            <div className={styles.checkboxGroup}>
                <input
                    type='checkbox'
                    id='isAvailable'
                    checked={isAvailable}
                    onChange={e => setIsAvailable(e.target.checked)}
                />
                <label htmlFor='isAvailable'>В наличии?</label>
            </div>
            <button type='submit'>Добавить</button>
        </form>
    )
}

export default AddItem
