import { useEffect, useState } from "react";
import "./css/App.css"
import "./css/pop.scss"
import Item from "./views/Item";
import ItemEnchant from "./views/ItemEnchant";
import Dragable from "./common/component/Dragable";
import { type positionType } from "./common/option/typeOption";
import { type ItemInfo } from "./common/option/CommonItem";

function App() {
  const itemTable = { row: 10, col: 4 };
  const [type, setType] = useState("equip");
  const [showFlag, setShowFlag] = useState({ item: false, enchant: false });
  const [position, setPosition] = useState<positionType>({
    item: { x: 100, y: 100 },
    enchant: { x: 600, y: 100 },
  });
  const [move, setMove] = useState({ item: false, enchant: false });
  const [dropItem, setDropItem] = useState<ItemInfo>();  
  
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
          flag={move.item}
          htmlContent={
            <Item
              {...itemTable}
              itemType={type}
              setItemType={setItemType}
              showFlag={(e) => {
                setShowFlag({ ...showFlag, item: e });
              }}
              moveFlag={(e) => setMove({ ...move, item: e })}
              dropItem={(e) => setDropItem(e)}
              position={position}
            />
          }
          initPosition={position.item}
          remindPosition={(e) => {            
            setPosition({ ...position, item: e });
          }}
        />
      );
    }
  }

  function loadEnchant() {
    if (showFlag.enchant) {
      return (
        <Dragable
          flag={move.enchant}
          htmlContent={
            <ItemEnchant
              item={dropItem}
              showFlag={(e) => {
                setShowFlag({ ...showFlag, enchant: e });
              }}
              moveFlag={(e) => setMove({ ...move, enchant: e })}
            />
          }
          initPosition={position.enchant}
          remindPosition={(e) => {
            setPosition({ ...position, enchant: e });
          }}
        />
      );
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
