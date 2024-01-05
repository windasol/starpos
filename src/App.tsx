import './App.css'
import Item from './views/item'

function App() {
  const table = {row: 10, col: 4}

  return (
    <Item {...table}/>
  )
}

export default App
