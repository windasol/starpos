import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

type Props = {
  top: number;
  left: number;
  clear: (flag: boolean) => void;
};

const shineAnimation = keyframes`
0% {
  transform: scale(0.2); 
  opacity: 1;
}
25% {
  transform: scale(0.4); 
  opacity: 0.9;
}
50% {
  transform: scale(0.7); 
  opacity: 0.8;
}
75% {
  transform: scale(1); 
  opacity: 0.7;
}
100% {
  transform: scale(1.5); 
  opacity: 0;
}
`;

const ShineEffect = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(#ffff00, transparent);
  animation: ${shineAnimation} 1s linear forwards;
`;

function EnchantEffect({ top, left, clear }: Props) {
  const shineEffectRef = useRef<HTMLDivElement>(null);

  function handleAnimation() {
    if (shineEffectRef.current) {
      shineEffectRef.current.addEventListener("animationend", onAnimationEnd);
    }
  }

  function onAnimationEnd() {
    clear(false);

    if (shineEffectRef.current) {
      shineEffectRef.current.removeEventListener(
        "animationend",
        onAnimationEnd
      );
    }
  }

  useEffect(() => {
    handleAnimation();
        
    return () => {
      if (shineEffectRef.current) {
        shineEffectRef.current.removeEventListener(
          "animationend",
          onAnimationEnd
        );
      }
    };
  }, []);

  return (
    <div
      className="image-container"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        position: "absolute",
      }}
    >
      <ShineEffect ref={shineEffectRef} />
    </div>
  );
}

export default EnchantEffect;
