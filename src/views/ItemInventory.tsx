import { useEffect, useState } from 'react';
import {type ItemInfo, itemType, SpendInfo, EquipInfo, EtcInfo, CashInfo} from '../common/option/CommonItem';
import { coordinate, positionType, showType } from '../common/option/typeOption';
import PopEquipInfo from './starpos/PopEquipInfo';
import { searchItem, upgradeItem } from '../common/rest/ItemRest';
import DragImage from '../common/component/DragImage';

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
  const [grapPosition, setGrapPosition] = useState<coordinate>({x: 0, y:0});
  const [grapItem, setGrapItem] = useState<ItemInfo>();
  const [showInfo, setShowInfo] = useState(0);      
  const [switchs, setSwitchs] = useState(true);
  
  async function initItem() {
    const itemData = await searchItem('admin', itemType);            
    setItems([...itemData]);            
  }

  useEffect(() => {
    initItem();
  }, [itemType])

  function renderRows() {
    const rows = [];
    for (let i = 0; i < row; i++) {
      rows.push(        
          <table key={i} style={{marginLeft: '0.2em'}}>
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
  
  function itemGrap(event: React.MouseEvent,item: ItemInfo | undefined) {
    if(item) {           
      setGrapPosition({x: event.clientX - 120, y: event.clientY -120});      
      setGrapItem(item);
      setIsGrap(!isGrap);
    }
  }

  function renderColumns (tableRow: number) {    
    const columns = [];
    for (let j = 0; j < col; j++) {
      const now = ((j + 1) + (tableRow * col));      
      const item = items.find((e) => e.orders == now);      
      columns.push(        
        <td key={j} className='itemTable' onMouseOver={() => {setShowInfo(now)}} onMouseLeave={() => {setShowInfo(0)}} onClick={(event) => itemGrap(event, item)} style={{cursor: isGrap ? 'grabbing' : 'pointer'}} id={`${now}`}>                          
          {item && switchs ? <img className="itemImg" src={item.imgUrl} style={{opacity: 'destroy' in item ? item.destroy ? 0.5 : 1 : 1}}></img> : ''}
          <span>{item && 'count' in item ? item.count : ''}</span>          
          {!isGrap && item && now == showInfo ? showType(item) : ''}         
        </td>        
      );
    }

    return columns;
  }
  
  async function imgDrop(e: coordinate) {
    await setSwitchs(false);
    await setIsGrap(false);      
    const x = e.x + 120;
    const y = e.y + 120;    
    const element = document.elementFromPoint(x, y);    
    const orders = Number(element?.id);          

    if (orders !== 0 && !isNaN(orders)) {      
      let data = {...grapItem, orders: orders} as ItemInfo;
      const duplication = items.find((e) => e.orders == orders);      
      if (duplication) {        
        const dupl = {...duplication, orders: grapItem!.orders};
        data = {...data, orders: orders};        
        await upgradeItem(dupl, itemType);      
      }
      
      await upgradeItem(data, itemType);
      await initItem();
    } else {  
      if (showFlag.enchant) {                  
        const endX = position.enchant.x + 343;
        const endY = position.enchant.y + 283;
        const startX = position.enchant.x;
        const startY = position.enchant.y + 30;
        const check = x >= startX && x <= endX && y >= startY && y <= endY;
        if (check && grapItem!.type == 'equip') dropItem(grapItem);                        
      }
    }
    await setSwitchs(true);
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
        {isGrap && <DragImage grapImg={grapItem!.imgUrl} isGrap={isGrap} itemDrop={(e) => imgDrop(e)} position={grapPosition}/>}
    </div>           
  )
}

export default ItemInventory;
