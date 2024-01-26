import React, { ReactNode, useState } from 'react';
import { type coordinate } from '../common/typeOption';

interface Props {
  htmlContent: ReactNode;
  initPosition: coordinate;
  remindPosition: (position: coordinate) => void;    
}

const DragMove = ({htmlContent, initPosition, remindPosition} : Props) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(initPosition);
  const [startPosition, setStartPosition] = useState({x: 500, y:500});
  
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
    remindPosition(position);
  };

  return (
    <span
      className='noneDrag'
      draggable={false}
      style={{        
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,        
      }}
      onMouseDown={(e) => {handleMouseDown}}
      onMouseMove={(e) => {handleMouseMove}}
      onMouseUp={handleMouseUp}
    >         
     {htmlContent}
    </span>
  );
};

export default DragMove;