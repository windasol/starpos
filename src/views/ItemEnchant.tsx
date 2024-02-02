import { useState } from "react";
import { ItemInfo } from "../common/option/CommonItem";
import Starpos from "./Starpos";
import EnchantConfirm from "./EnchantConfirm";
import EnchantResult from "./EnchantResult";
import { successPercentage, failPercentage } from "../common/option/CommonItem";
import EnchantEffect from "./EnchantEffect";
import { nextTick } from "process";

type Props = {
  showFlag: (flag: boolean) => void;
  moveFlag: (flag: boolean) => void;
  item?: ItemInfo;
};

function ItemEnchant({ showFlag, moveFlag, item }: Props) {
  
  const [starpos, setStarpos] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [resultPop, setResultPop] = useState(false);
  const [effect, setEcffect] = useState(false);  
  const [result, setResult] = useState('');    
  const [starCatch, setStarCatch] = useState(false);  
  let flag = false;

  function enchant() {
    if (item?.type == "equip") {
      flag = true;
      return (
        <div
          style={{
            width: "343px",
            height: "283px",
            backgroundImage: "url(/images/inner-starpos2.png)",
            zIndex: 999,
            color: "white",
          }}
        >
          <button>주문서</button>
          <button>스타포스 강화</button>
          <button>장비전승</button>
          <div>메소를 사용하여 장비를 강화합니다.</div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <img
                style={{ width: "100px", height: "100px" }}
                src={item.equip?.img}
                id="enchantImg"
              ></img>
              {upgradeEffect()}
            </div>
            <div style={{ width: "50%" }}>
              <div>
                {item.equip?.starpos ?? 0} &gt; {(item.equip?.starpos ?? 0) + 1}
              </div>
              <div>
                성공확률 : {successPercentage[item.equip?.starpos ?? 0]}%
              </div>
              <div>
                실패({maintainOrDown()})확률 :{" "}
                {failPercentage[item.equip?.starpos ?? 0]}%
              </div>              
            </div>
          </div>
          스타캐치 해제
          <input type="checkbox" onChange={(e) => setStarCatch(e.target.checked)}/>
          파괴방지
          <input type="checkbox" />
          <div>필요한 메소 : 1010,210</div>
          <button onClick={() => setConfirm(true)} disabled={effect || resultPop}>강화</button>
          <button onClick={() => showFlag(false)} disabled={effect || resultPop}>취소</button>
        </div>
      );
    }
  }

  function maintainOrDown() {
    const starpos = successPercentage[item?.equip?.starpos ?? 0];
    if (starpos < 15) {
      return "유지";
    } else {
      if (starpos % 5 == 0) {
        return "유지";
      }
      return "하락";
    }
  }

  // 강화 아이템 이미지
  function defaultImg() {
    if (flag) {
      return "";
    } else {
      return item?.type == "equip" ? (
        ""
      ) : (
        <img src="/images/inner-starpos.png" draggable={false}></img>
      );
    }
  }  

   // 스타포스 확인 ,취소 팝업
   function confirmPopup() {
    if (confirm) {      
      return <EnchantConfirm start={(e) => startCheck(e)} />;
    }
  }

  // 스타포스, 이펙트 활성화 , confirm 창 닫기
  function startCheck(flag: boolean) {
    if (starCatch) {
      setEcffect(flag); 
    } else {
      setStarpos(flag);    
    }
    setConfirm(false);
  }

  // 스타포스 팝업
  function starposPopup() {
    if (starpos) {
      return (
        <Starpos
          item={item}
          isShow={(e) => starposResult(e)}          
        />
      );
    }
  }

  // 스타포스 후 결과
  function starposResult(flag: boolean) {
    setStarpos(flag);    
    setEcffect(true);    
  }

  // 강화중 이펙트
  function upgradeEffect() {
    const element = document.getElementById("enchantImg");
    const top = element?.offsetTop ?? 0;
    const left = element?.offsetLeft ?? 0;
    if (effect) {      
      return (
        <EnchantEffect
          top={top}
          left={left}
          clear={() =>  nextTick(()=> {
            setEcffect(false);
            setResultPop(true);
            percentCal();
          })}
        />        
      );
    }
  }

  // 스타포스 확률 계산
  function percentCal() {            
    if (item?.equip?.starpos != undefined) {
      const success = successPercentage[item.equip.starpos];
      const fail = failPercentage[item.equip.starpos];      
      const randomValue = Math.random() * 100;
      const starpos = item.equip.starpos;
      
      // 파괴확률 없을때
      if (fail == 0) {
        if (randomValue < success) {          
          item.equip.starpos += 1;          
          setResult('성공');      
        } else {
          setResult('실패');      
        }
      } else {
        if (randomValue < success) {
            item.equip.starpos += 1;          
            setResult('성공');      
        } else if (randomValue < (success + fail)) {
          if (starpos % 5 != 0) {
            item.equip.starpos -= 1;          
          }
          setResult('실패');   
        } else {
          item.equip.starpos = -999;     
          setResult('파괴');   
        }
      }
      
    }
  }

  // 결과 팝업
  function resultPopup() {
    if (resultPop && !effect) {            
      return <EnchantResult result={result} isShow={() => setResultPop(false)} />;
    }
  }  

  return (
    <div className="noneDrag">
      <div className="centered-container">
        <div
          className="itemTop"
          onMouseDown={() => moveFlag(true)}
          onMouseUp={() => moveFlag(false)}
        >
          <div style={{ width: "80%", marginLeft: "3em" }}>
            Equipment Enchant
          </div>
          <div
            style={{ width: "20%", cursor: "pointer" }}
            onClick={() => {
              showFlag(false);
            }}
          >
            x
          </div>
        </div>
        <div>{defaultImg()}</div>
        {enchant()}
      </div>
      {starposPopup()}
      {confirmPopup()}
      {resultPopup()}      
    </div>
  );
}

export default ItemEnchant;
