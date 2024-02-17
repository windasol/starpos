import { useEffect, useState } from "react";
import { positionType, showType } from "../common/option/typeOption";
import { EquipInfo, itemType } from "../common/option/CommonItem";
import Dragable from "../common/component/Dragable";
import ItemInventory from "./ItemInventory";
import EquipmentEnchant from "./EquipmentEnchant";

function EnchantMangement() {
  const itemTable = { row: 10, col: 4 };
  const [type, setType] = useState<itemType>("equip");
  const [showFlag, setShowFlag] = useState<showType>({ item: false, enchant: false });
  const [position, setPosition] = useState<positionType>({
    item: { x: 100, y: 100 },
    enchant: { x: 600, y: 100 },
  });
  const [move, setMove] = useState({ item: false, enchant: false });
  const [dropItem, setDropItem] = useState<EquipInfo>();

  function showKeydown(event: KeyboardEvent) {
    const key = event.key;
    if (key == "i") {
      setShowFlag({ ...showFlag, item: !showFlag.item });
    } else if (key == "o") {
      setShowFlag({ ...showFlag, enchant: !showFlag.enchant });
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", showKeydown);
    return () => {
      window.removeEventListener("keydown", showKeydown);
    };
  });

  return (    
    <div>
      <div style={{backgroundImage: 'url(/images/henesis.png)'}}></div>
      {showFlag.item && (
        <Dragable
          flag={move.item}
          htmlContent={
            <ItemInventory
              {...itemTable}
              itemType={type}
              showFlag={showFlag}
              setItemType={(itemType) => setType(itemType)}
              closeBtn={(flag) => {
                setShowFlag({ ...showFlag, item: flag });
              }}
              moveFlag={(flag) => setMove({ ...move, item: flag })}
              dropItem={(item) => setDropItem(item)}
              position={position}
            />
          }
          initPosition={position.item}
          remindPosition={(remindPosition) => {
            setPosition({ ...position, item: remindPosition });
          }}
        />
      )}
      {showFlag.enchant && (
        <Dragable
          flag={move.enchant}
          htmlContent={
            <EquipmentEnchant
              item={dropItem}
              closeBtn={(flag) => {
                setShowFlag({ ...showFlag, enchant: flag });
              }}
              moveFlag={(flag) => setMove({ ...move, enchant: flag })}
            />
          }
          initPosition={position.enchant}
          remindPosition={(remindPosition) => {
            setPosition({ ...position, enchant: remindPosition });
          }}
        />
      )}
    </div>    
  );
}

export default EnchantMangement;
