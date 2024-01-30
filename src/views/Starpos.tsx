import { useEffect, useRef, useState } from "react";
import { ItemInfo } from "../common/CommonItem";

type Props = {
  item?: ItemInfo;
};

function Starpos({ item }: Props) {
  const [tarsnform, setTransform] = useState(0);
  const [direction, setDirection] = useState(1);
  const [count, setCount] = useState(0);  
  const intervalIdRef = useRef(null);

  useEffect(() => {    
      const intervalId = setInterval(() => {
        setTransform((prevPosition) => {
          if (prevPosition == 250) {
            setDirection(-1);
          } else if (prevPosition == 0) {
            setDirection(1);
            setCount(count + 1);
          }
  
          return prevPosition + direction;
        });
      }, 1);

      if (count == 8) {
        clearInterval(intervalId);
      }
      return () => clearInterval(intervalId);    
  }, [direction]); // direct


  return (
    <div
      style={{
        width: '300px',        
        zIndex: '999',
        position: "absolute",
        backgroundColor: 'gray',        
      }}
      >
      <p style={{fontSize: '12px', color: 'white'}}>별을 정확한 곳에 멈추면 강화 성공률이 증가하며</p>
      <p style={{fontSize: '12px', color: 'white'}}>연속해서 강화를 시도하면 난이도가 증가합니다.</p>
      <div>
        <img src={item?.equip?.img} style={{width: '100px', height: '100px'}}></img>
      </div>
      <div className="moving-box">
        <div
          style={{
            transform: `translateX(${tarsnform}px)`,
            backgroundColor: "blue",
            width: "50px",
          }}
        >
          star
        </div>
      </div>
      <button>stop</button>
    </div>
  );
}

export default Starpos;
