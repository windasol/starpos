import { useEffect, useState } from 'react'
import './App.css'
import Item from './views/Item'
import ItemUpgrade from './views/ItemEnchant'
import DragMove from './views/DragMove'

function App() {
  const table = {row: 10, col: 4}
  const [type, setType] = useState('equip');
  const [show, setShow] = useState(true);
  function setItemType(itemType: string) {
    setType(itemType);
  }

  function keydownHandler(event: KeyboardEvent) {
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
        <div draggable="false" className='noneDrag' >
          <Item {...table} itemType={type} setItemType={setItemType} showFlag={(e) => {close(e)}} />
        </div>
      )
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);    
    return() => {
      window.removeEventListener('keydown', keydownHandler);      
    }
  })

  return (    
    <>
     {showItem()}        
     <ItemUpgrade/>       
     <DragMove />      
    </>
  )
}

export default App
