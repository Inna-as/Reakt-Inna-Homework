import Header from './components/UI/Header'
import ItemList from './components/items/itemlist/itemlist'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function App() {
  return (
    <div 
      className="app-wrapper" 
      style={{ 
        backgroundImage: `url(${API_URL}/images/items/background.jpg)`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}
    >
      <Header logoUrl={`${API_URL}/images/items/logo.png`} />

      <ItemList />
    </div>
  )
}

export default App
