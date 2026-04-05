import { useState } from 'react'
import styles from './itemCard.module.css'

const ItemCard = ({ item, onUpdate, onDelete }) => {
    const [isUpdating, setIsUpdating] = useState(false)

    const handleToggleAvailability = async () => {
        setIsUpdating(true)
        try {
            await onUpdate(item.id, { isAvailable: !item.isAvailable })
        } catch (error) {
            console.error("Ошибка при обновлении:", error)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className={styles.item}>
            <div className={styles.info}>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                <div className={item.isAvailable ? styles.available : styles.unavailable}>
                    {item.isAvailable ? 'В наличии :)' : 'Нет в наличии :('}
                </div>
            </div>

            <div className={styles.actions}>
                <button 
                    className={styles.updateBtn} 
                    onClick={handleToggleAvailability}
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Обновление...' : 'Изменить статус'}
                </button>

                <button 
                    className={styles.deleteBtn} 
                    onClick={() => onDelete(item.id)}
                >
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default ItemCard
