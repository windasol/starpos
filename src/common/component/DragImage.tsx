import { useEffect, useState } from 'react';
import { coordinate } from '../option/typeOption';

type Props = {    
  grapImg: string;
  isGrap: boolean;
  position: coordinate;
  itemDrop: (postion:coordinate) => void;
};

const DragImage = ({grapImg, isGrap, position, itemDrop} : Props) => {  
  const [imagePosition, setImagePosition] = useState<coordinate>(position);
  const handleMouseMove = (event: MouseEvent) => {
    if (isGrap) {      
      const offsetX = event.clientX -120;
      const offsetY = event.clientY -120;
      setImagePosition({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseUp = () => {      
    itemDrop(imagePosition);
  };

  useEffect(() => {            
    window.addEventListener("mousemove", handleMouseMove);    
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div>
      {isGrap && (
        <img
          className='itemImg'
          src={grapImg}
          alt="Draggable"
          style={{ position: 'absolute', left: `${imagePosition.x}px`, top: `${imagePosition.y}px`, zIndex: '999', cursor: 'grabbing', opacity: 0.7}}
        />
      )}
    </div>
  );
};

export default DragImage;
