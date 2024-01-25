import React, { useState } from 'react';
import Item from './Item';

const DragMove = () => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 500, y: 100 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });  
  const table = {row: 10, col: 4}
  const [type, setType] = useState('equip');
  const [show, setShow] = useState(true);
  function setItemType(itemType: string) {
    setType(itemType);
  }      

  const handleMouseDown = (e:MouseEvent) => {
    setDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e:MouseEvent) => {
    if (dragging) {
      const deltaX = e.clientX - startPosition.x;
      const deltaY = e.clientY - startPosition.y;

      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));

      setStartPosition({ x: position.x, y: position.y });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      style={{        
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,        
      }}
      onMouseDown={(e) => {handleMouseDown}}
      onMouseMove={(e) => {handleMouseMove}}
      onMouseUp={handleMouseUp}
    >         
     <Item {...table} itemType={type} setItemType={setItemType} showFlag={(e) => {close(e)}} remindPosition={position}/>    
    </div>
  );
};

export default DragMove;