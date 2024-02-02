import { useState, useEffect } from 'react';

type Props = {
    top: number;
    left: number;
    clear: (flag: boolean) => void
}

const EnchantEffect = ({top, left, clear} : Props) => {  
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {        
    const fadeOutInterval = setInterval(() => {      
      setOpacity((prevOpacity) => {
        if (prevOpacity <= 0) {
          clearInterval(fadeOutInterval);     
          clear(false);          
          return 0;
        }
        return prevOpacity - 0.1;
      });
    }, 100);
    
    return () => {    
      clearInterval(fadeOutInterval);
    };
  }, [opacity]);

  return (
    <img 
    src="/images/effect2.png" 
    style={{
      width: '80px', 
      height: '80px', 
      marginLeft: '0.6em',
      marginTop: '0.6em',
      left: `${left}px`, 
      top: `${top}px`, 
      position: 'absolute', 
      opacity: opacity, 
      transition: 'opacity 0.8s ease-in-out' }} />
  );
};

export default EnchantEffect;
