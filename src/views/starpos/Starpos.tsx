import { useEffect, useRef, useState } from "react";
import { ItemInfo } from "../../common/option/CommonItem";
import StarposEffect from "./StarposEffect";

type Props = {
  item?: ItemInfo;
  isResult: (flag: boolean) => void;  
};

function Starpos({ item, isResult }: Props) {  
  const [tarsnform, setTransform] = useState(0);
  const [direction, setDirection] = useState(1);
  const [count, setCount] = useState(0);    
  const [timeLimit, setTimeLimit] = useState(6);
  const [isCatch, isSetCatch] = useState(false);
  const [percentUp, setPercentUp] = useState(false);
  const position = useRef(0);
  
  const intervalIdRef = useRef<number | null>(null);  

  function stopInterval() {
    if (intervalIdRef.current != null) {
      window.clearInterval(intervalIdRef.current);
    }
  }

  function stop() {       
    const x = position.current; 
    if (x >= 106 &&  x<= 150) {
      setPercentUp(true);
    }    
    stopInterval();
    isSetCatch(true);    
  }

  function keydownStop(event: KeyboardEvent) {         
    const key = event.key
    if (key === ' ') {    
      event.preventDefault();             
      stop();                    
    }   
  }
  
  function delay(ms: number) {
    return new Promise(r => setTimeout(r,ms));
  }

  function starposClose() {
    isResult(percentUp);    
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
          position.current =  prevPosition + direction;
          return prevPosition + direction;
        });
      }, 1);
      
      for (let i = 0; i < 5; i++)   {        
        setTimeLimit(timeLimit - 1);
        delay(1000);
      }      

      if (count == 5) {
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
        marginTop: '-16.5em',
      }}>            
      <p style={{fontSize: '12px', color: 'white'}}>별을 정확한 곳에 멈추면 강화 성공률이 증가하며 <br/> 연속해서 강화를 시도하면 난이도가 증가합니다.</p>      
      <div className="number">{!isCatch && timeLimit}</div>  
      <div className="percentUp">{percentUp && <p>+ 강화 성공률</p> }</div>  
      <div>     
        <img src={item?.img} style={{width: '100px', height: '100px'}}></img>
      </div>
      
      <div
          style={{
            transform: `translateX(${tarsnform}px)`,     
            position: 'absolute',
            width: '50px',       
            zIndex: '999',
          }}
        >          
          <img src="/images/starcatch.png" style={{width: '35px'}}></img>      
          {isCatch && <StarposEffect top={-30} left={-20} clear={() => starposClose()}></StarposEffect>}
      </div>  
      <div className="container">
        <div className="content" >                  
        </div>
      </div>      
      <button onClick={() => stop()}>stop</button>
    </div>
  );
}

export default Starpos;
