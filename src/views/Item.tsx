import React, { useState } from 'react';
import {type ItemInfo, equipData} from '../../public/Common/CommonItem';

type Props = {
    row: number;
    col: number;
    itemType: string;
    setItemType: (itemType: string) => void;
}

function Item({row, col, itemType, setItemType} : Props) {
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
  };
  
  function renderColumns (tableRow: number) {
    const columns = [];
    for (let j = 0; j < numColumns; j++) {
      const now = ((j + 1) + (tableRow * col));
      const item = items.filter((e:any) => e.type == itemType).filter((e:any) => e[itemType].order == now)
      console.log(item)

      columns.push(        
        <td key={j} className='itemTable' onMouseOver={() => {setShowInfo(now)}} onMouseLeave={() => {setShowInfo(0)}}>
         {item[0].equip.name ?? ''}
         { showItem(item[0], now)}
        </td>        
      );
    }

    return columns;
  };

  function showItem(info:ItemInfo, now: number) {
    if (info && now == showInfo) {
      return <div className='itemInfo'>
        <p>스타포스 : {info.starpos}</p>
        <p>이름 : {info.name}</p>
        <p>레벨 : {info.level}</p>
      </div>
    }
  }
  
  function typeStyle(type: string) {
    return itemType == type ? {border: '1px solid'} : {};
  }

  return (
    <>
        <div className='bigTable'>    
            <div>item inventory</div>
            <button style={typeStyle('equip')} onClick={() => setItemType('equip')}>장비</button>
            <button style={typeStyle('spend')} onClick={() => setItemType('spend')}>소비</button>
            <button style={typeStyle('etc')} onClick={() => setItemType('etc')}>기타</button>
            <button style={typeStyle('cash')} onClick={() => setItemType('cash')}>캐쉬</button>
            {renderRows()}    
        </div>    
    </>
  )
}

export default Item;
