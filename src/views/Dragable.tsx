import { ReactNode, useEffect, useState } from "react";
import { type coordinate } from "../common/typeOption";

interface Props {
    htmlContent: ReactNode;
    initPosition: coordinate;
    remindPosition: (position: coordinate) => void;    
    flag: boolean;
}

function Dragable({htmlContent, remindPosition, initPosition, flag} : Props) {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(initPosition);
  const [startPosition, setStartPosition] = useState({x: 500, y:500});
  const [moveFlag, setMoveFlag] = useState(flag);
  // const moveFlag = flag;

  const handleMouseDown = (e: MouseEvent) => {        
    console.log(flag);
    if (moveFlag) {
      setDragging(true);
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging && moveFlag) {        
      const deltaX = e.clientX - startPosition.x;
      const deltaY = e.clientY - startPosition.y;

      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));

      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {    
    console.log('mouse up')
    setDragging(false);
    // setMoveFlag(false);
    remindPosition(position);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return (
    <span draggable="false" onMouseDown={(e) => {handleMouseDown(e)}}
        style={{        
            position: 'absolute',
            top: `${position.y}px`,
            left: `${position.x}px`,        
        }}>
        {htmlContent}
    </span>
  )
}

export default Dragable;
