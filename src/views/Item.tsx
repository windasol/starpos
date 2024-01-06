import React, { useState } from 'react';
import {type ItemInfo, equipData} from '../../public/Common/CommonItem';

type Props = {
    row: number;
    col: number;
}

function Item({row, col} : Props) {
  const [items, setItems] = useState<ItemInfo[]>(equipData);
  const numRows = row;
  const numColumns = col;

  console.log(items);

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(        
          <table key={i}>
            <tbody>
              <tr className='itemTable'>
                {renderColumns()}
              </tr>
            </tbody>
          </table>        
      );
    }
    return rows;
  };
  
  const renderColumns = () => {
    const columns = [];
    for (let j = 0; j < numColumns; j++) {
      columns.push(        
        <td key={j} className='itemTable'>
          
        </td>        
      );
    }

    return columns;
  };

  return (
    <>
        <div className='bigTable'>    
            <div>item inventory</div>
            <button>장비</button>
            <button>소비</button>
            <button>기타</button>
            <button>캐쉬</button>
            {renderRows()}    
        </div>    
    </>
  )
}

export default Item;
