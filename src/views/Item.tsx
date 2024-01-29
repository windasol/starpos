import { useState } from 'react';
import {type ItemInfo, equipData} from '../common/CommonItem';
import { jobType } from '../common/JobOption';
import { positionType } from '../common/typeOption';

type Props = {
    row: number;
    col: number;
    itemType: string;
    setItemType: (itemType: string) => void;
    showFlag: (flag: boolean) => void;    
    moveFlag: (flag: boolean) => void; 
    dropItem: (item: ItemInfo) => void;
    position: positionType;
}

function Item({row, col, itemType, setItemType, showFlag, moveFlag, dropItem, position} : Props) {
  const [items, setItems] = useState<ItemInfo[]>(equipData);  
  const [showInfo, setShowInfo] = useState(0);    
  const numRows = row;
  const numColumns = col;

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
  
  function renderColumns (tableRow: number) {
    const columns = [];
    for (let j = 0; j < numColumns; j++) {
      const now = ((j + 1) + (tableRow * col));
      const item = items.filter((e) => e.type == itemType).filter((e:any) => e[itemType].order == now)[0]      
      
      columns.push(        
        <td key={j} className='itemTable' onMouseDown={() => {setShowInfo(0)}} onMouseOver={() => {setShowInfo(now)}} onMouseLeave={() => {setShowInfo(0)}}>          
          {item ? <img className="itemImg" onDragEnd={() => imgDrop(item)} src={item[itemType].img}></img> : ''}
          <span>{showCount(item)}</span>          
          {item && now == showInfo ? showType(item) : ''}         
        </td>        
      );
    }

    return columns;
  }
  
  function imgDrop(item: ItemInfo) {
    // const { top, left } = e.currentTarget.getBoundingClientRect();
    // const x = e.clientX - left;
    // const y = e.clientY - top;

    // console.log(top)
    // console.log(left)
    // console.log(position.enchant);

    // // 좌표가 해당 범위 안에 있는지 확인
    // if (x >= position.enchant.x && y >= position.enchant.y ) {
    //   alert('알림: 드래그가 40px, 40px 위치에서 종료되었습니다.');
    // }
    
    // if (x <= position.enchant.x && y <= position.enchant.y) {
      // }
      dropItem(item);

  }

  function showCount(info: ItemInfo) {
    if (info) {
      if (info[itemType].count) {
        return info[itemType].count;                  
      }
    }    
  }

  function showType(info:ItemInfo) {    
    if(itemType == 'equip') {
      return showEquip(info);
    } else if(itemType == 'spend')  {
      return showSpend(info);
    } else if(itemType == 'etc') {
      return showEtc(info);
    } else if(itemType == 'cash') {
      return showCash(info);
    }
  }

  function showEquip(info:ItemInfo) {    
    return (
      <div className='itemInfo'>
        <p>스타포스 : {info.equip?.starpos}</p>
        <p>{info.equip?.name}</p>
        <p>REQ LEV : {info.equip?.level}</p>        
        <img className="showItemIng" src={info.equip?.img}></img>
        <p>직업 : {jobType[info.equip?.job ?? '']}</p>
    </div>
    )
  }

  function showSpend(info:ItemInfo) {
    return (
      <div className='itemInfo'>      
        <p>{info.spend?.name}</p>
        <p>{info.spend?.description}</p>
        <img className="showItemIng" src={info.spend?.img}></img>               
      </div>
    )
  }

  function showEtc(info:ItemInfo) {
    return (
      <div className='itemInfo'>      
        <p>{info.etc?.name}</p>
        <p>{info.etc?.description}</p>    
        <img className="showItemIng" src={info.etc?.img}></img>                    
    </div>
    )
  }

  function showCash(info:ItemInfo) {
    return (
      <div className='itemInfo'>      
      <p>{info.cash?.name}</p>                
      <img className="showItemIng" src={info.cash?.img}></img>
    </div>
    )
  }

  function typeStyle(type: string) {
    return itemType == type ? {border: '1px solid'} : {};
  }

  function itemHead() {
    return (
      <div className='itemTop' onMouseDown={(e) => moveFlag(true)} onMouseUp={(e) => moveFlag(false)}>
        <div style={{width: '80%', marginLeft: '3em'}} draggable="false">Item Inventory</div>
        <div style={{width: '20%', cursor: 'pointer'}} onClick={() => {showFlag(false)}}>x</div>
      </div>      
    )
  }

  return (    
    <div className='bigTable'>       
        {itemHead()}
        <button className="itemButton" style={typeStyle('equip')} onClick={() => setItemType('equip')}>장비</button>
        <button className="itemButton" style={typeStyle('spend')} onClick={() => setItemType('spend')}>소비</button>
        <button className="itemButton" style={typeStyle('etc')} onClick={() => setItemType('etc')}>기타</button>
        <button className="itemButton" style={typeStyle('cash')} onClick={() => setItemType('cash')}>캐쉬</button>
        {renderRows()}    
    </div>                
  )
}

export default Item;
