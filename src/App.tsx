import { useEffect, useState } from "react";
import "./App.css";
import Item from "./views/Item";
import ItemEnchant from "./views/ItemEnchant";
import Dragable from "./views/Dragable";
import { type positionType } from "./common/typeOption";

function App() {
  const itemTable = { row: 10, col: 4 };
  const [type, setType] = useState("equip");
  const [showFlag, setShowFlag] = useState({ item: false, enchant: false });
  const [position, setPosition] = useState<positionType>({ item : {x: 200, y: 100 }, enchant : {x: 700, y: 100}})  
  const [move, setMove] = useState(true);

  function setItemType(itemType: string) {
    setType(itemType);
  }

  function showKeydown(event: KeyboardEvent) {
    const key = event.key;
    if (key == "i") {
      setShowFlag({ ...showFlag, item: !showFlag.item });
    } else if (key == "o") {      
      setShowFlag({ ...showFlag, enchant: !showFlag.enchant });
    }
  }
  
  function loadItem() {
    if (showFlag.item) {
      return (
        <Dragable
          htmlContent={
            <div draggable="false" className="noneDrag">
              <Item
                {...itemTable}
                itemType={type}
                setItemType={setItemType}
                showFlag={(e) => {
                  setShowFlag({ ...showFlag, item: e })
                }}
              />
            </div>
          }
          initPosition={position.item}
          remindPosition={(e) => {
            setPosition({...position, item: e});
          }}
        />
      );
    }
  }

  function loadEnchant() {
    if (showFlag.enchant) {
      return (
        <Dragable 
          flag={move}
          htmlContent={<ItemEnchant showFlag={(e) => {setShowFlag({ ...showFlag, enchant: e })}} moveFlag={(e) => setMove(e)}/>}  
          initPosition={position.enchant}
          remindPosition={(e) => {
            setPosition({...position, enchant: e});
        }}/>            
      )
    }
  }
  
  useEffect(() => {
    window.addEventListener("keydown", showKeydown);
    return () => {
      window.removeEventListener("keydown", showKeydown);
    };
  });

  return (
    <>      
      {loadItem()}
      {loadEnchant()}
    </>
  );
}

export default App;
