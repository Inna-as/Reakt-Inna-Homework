import styles from './Header.module.css'

const Header = ({ logoUrl }) => {
    return (
        <header className={styles.header}>
            <img src={logoUrl} alt="Logo" className={styles.logo} />
            <span className={styles.title}>Гараж </span>
        </header>
    )
}

export default Header
