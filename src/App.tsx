import { useEffect, useState } from 'react'
import './App.css'
import Item from './views/Item'

function App() {
  const table = {row: 10, col: 4}
  const [type, setType] = useState('equip');
  const [show, setShow] = useState(true);
  function setItemType(itemType: string) {
    setType(itemType);
  }

  function handler(event: KeyboardEvent) {
    const key = event.key;
    if (key == 'i') {
      setShow(!show);
    }
  }

  function close(flag: boolean) {
    setShow(flag);
  }

  function showItem() {
    if (show) {
      return (
        <Item {...table} itemType={type} setItemType={setItemType} showFlag={(e) => {close(e)}}/>
      )
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return() => {
      window.removeEventListener('keydown', handler);
    }
  })

  return (    
    <>
     {showItem()}
    </>
  )
}

export default App
