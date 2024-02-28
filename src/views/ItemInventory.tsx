import { useEffect, useState } from 'react';
import {type ItemInfo, itemType, SpendInfo, EquipInfo, EtcInfo, CashInfo} from '../common/option/CommonItem';
import { positionType, showType } from '../common/option/typeOption';
import PopEquipInfo from './starpos/PopEquipInfo';
import { searchItem } from '../common/rest/ItemRest';

type Props = {
  row: number;
  col: number;
  itemType: itemType;
  showFlag: showType;
  setItemType: (itemType: itemType) => void;
  closeBtn: (flag: boolean) => void;    
  moveFlag: (flag: boolean) => void; 
  dropItem: (item?: EquipInfo) => void;
  position: positionType;
}

function ItemInventory({row, col, itemType, showFlag, setItemType, closeBtn, moveFlag, dropItem, position} : Props) {
  const [items, setItems] = useState<ItemInfo[]>([]);  
  const [isGrap, setIsGrap] = useState(false);
  const [showInfo, setShowInfo] = useState(0);    
  const numRows = row;
  const numColumns = col;
  
  useEffect(() => {
    async function initItem() {
      const itemData = await searchItem('admin', itemType);            
      setItems([...itemData]);            
    }
    initItem();
  }, [itemType])

  function renderRows() {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(        
          <table key={i}>
            <tbody>
              <tr className='itemTable'>
                {renderColumns(i)}
              </tr>
            </tbody>
          </table>        
      );
    }
    return rows;
  }
  
  function clickHandler() {
    setIsGrap(!isGrap);    
  }

  function drop() {
    if (isGrap) {
      setIsGrap(false);
    }
  }

  function moveEvent(event: MouseEvent) {
    if (isGrap) {
      console.log(event);
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", moveEvent);
    window.addEventListener("click", drop);
    return () => {
      window.removeEventListener("mousemove", moveEvent);
      window.addEventListener("click", drop);
    };
  });


  function renderColumns (tableRow: number) {    
    const columns = [];
    for (let j = 0; j < numColumns; j++) {
      const now = ((j + 1) + (tableRow * col));      
      const item = items.find((e) => e.orders == now);      
      columns.push(        
        <td key={j} className='itemTable' onMouseDown={() => {setShowInfo(0)}} onMouseOver={() => {setShowInfo(now)}} onMouseLeave={() => {setShowInfo(0)}} onClick={() => clickHandler()} >          
          {item ? <img className="itemImg" onDragEnd={(event) => imgDrop(event, item as EquipInfo)} src={item.imgUrl}></img> : ''}
          <span>{item && 'count' in item ? item.count : ''}</span>          
          {item && now == showInfo ? showType(item) : ''}         
        </td>        
      );
    }

    return columns;
  }
  
  function imgDrop(e: React.DragEvent, item: EquipInfo) {
    if (showFlag.enchant) {
      const x = e.clientX;
      const y = e.clientY;
      
      const endX = position.enchant.x + 343;
      const endY = position.enchant.y + 283;
      const startX = position.enchant.x;
      const startY = position.enchant.y + 30;
  
      const check = x >= startX && x <= endX && y >= startY && y <= endY;
      if (check && item.type == 'equip') dropItem(item);                  
    }
  }
  
  function showType(info:ItemInfo) {     
    switch(itemType) {
      case 'equip': 
        return (<PopEquipInfo equipInfo={info as EquipInfo}/>)       
      case 'spend':
        return showSpend(info as SpendInfo);        
      case 'etc':
        return showEtc(info as EtcInfo);
      case 'cash':
        return showCash(info as CashInfo);
    }    
  }

  function showSpend(info: SpendInfo) {
    return (
      <div className='itemInfo'>      
        <p>{info.name}</p>
        <p>{info.description}</p>
        <img className="showItemIng" src={info.imgUrl}></img>               
      </div>
    )
  }

  function showEtc(info: EtcInfo) {
    return (
      <div className='itemInfo'>      
        <p>{info.name}</p>
        <p>{info.description}</p>    
        <img className="showItemIng" src={info.imgUrl}></img>                    
    </div>
    )
  }

  function showCash(info: CashInfo) {
    return (
      <div className='itemInfo'>      
      <p>{info.name}</p>                
      <img className="showItemIng" src={info.imgUrl}></img>
    </div>
    )
  }

  function typeStyle(type: string) {
    return itemType == type ? {border: '1px solid'} : {};
  }

  return (    
    <div className='bigTable'>       
      <div className='itemTop' onMouseDown={() => moveFlag(true)} onMouseUp={() => moveFlag(false)}>
        <div style={{width: '80%', marginLeft: '3em'}} draggable="false">Item Inventory</div>
        <div style={{width: '20%', cursor: 'pointer'}} onClick={() => {closeBtn(false)}}>x</div>
      </div>     
       
        <button className="itemButton" style={typeStyle('equip')} onClick={() => setItemType('equip')}>장비</button>
        <button className="itemButton" style={typeStyle('spend')} onClick={() => setItemType('spend')}>소비</button>
        <button className="itemButton" style={typeStyle('etc')} onClick={() => setItemType('etc')}>기타</button>
        <button className="itemButton" style={typeStyle('cash')} onClick={() => setItemType('cash')}>캐쉬</button>
        {renderRows()}    
    </div>                
  )
}

export default ItemInventory;
