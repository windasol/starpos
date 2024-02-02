import { useEffect, useRef, useState } from "react";
import { ItemInfo } from "../common/option/CommonItem";

type Props = {
  item?: ItemInfo;
  isShow: (flag: boolean) => void;
  // setItem: (item: ItemInfo) => void;
  // success: (flag: boolean) => void;
  
};

function Starpos({ item, isShow }: Props) {  
  const [tarsnform, setTransform] = useState(0);
  const [direction, setDirection] = useState(1);
  const [count, setCount] = useState(0);    

  const intervalIdRef = useRef<number | null>(null);  

  function stopInterval() {
    if (intervalIdRef.current != null) {
      window.clearInterval(intervalIdRef.current);
    }
  }

  function stop() {               
    stopInterval();
    isShow(false);    
  }

  function keydownStop(event: KeyboardEvent) {         
    const key = event.key
    if (key === ' ') {    
      event.preventDefault();             
      stop();                    
    }   
  }
  
  useEffect(() => {        
    window.addEventListener("keydown", keydownStop);    
      intervalIdRef.current = window.setInterval(() => {
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
        stop();
      }        
      return () => {
        window.removeEventListener("keydown", keydownStop);        
        stopInterval();
      }
  }, [direction]); 

  return (
    <div
      className="popup"
      style={{
        width: '300px',        
        height: '270px',        
        backgroundImage: 'url(/images/upgradeBackground.png)',
        marginLeft: '1.5em',
        marginTop: '2em',
      }}>
      <p style={{fontSize: '12px', color: 'white'}}>별을 정확한 곳에 멈추면 강화 성공률이 증가하며</p>
      <p style={{fontSize: '12px', color: 'white'}}>연속해서 강화를 시도하면 난이도가 증가합니다.</p>
      <div>
        <img src={item?.equip?.img} style={{width: '100px', height: '100px'}}></img>
      </div>
      <div className="moving-box">
        <div
          style={{
            transform: `translateX(${tarsnform}px)`,     
            width: '50px',
          }}
        >
          <img src="/images/star.png" style={{width: '35px'}}></img>                  
        </div>
      </div>
      <button onClick={() => stop()}>stop</button>
    </div>
  );
}

export default Starpos;
