import { useState } from 'react'
import './App.css'
import Item from './views/item'

function App() {
  const table = {row: 10, col: 4}
  const [type, setType] = useState('equip');


  function setItemType(itemType: string) {
    setType(itemType);
  }

  return (
    <Item {...table} itemType={type} setItemType={setItemType}/>
  )
}

export default App
