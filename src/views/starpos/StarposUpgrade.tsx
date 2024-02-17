import { useRef, useState } from "react";
import StarposEffect from "./StarposEffect";
import { nextTick } from "process";
import { EquipInfo, destroyPercentage, failPercentage, statIncrease, statType, successPercentage } from "../../common/option/CommonItem";
import PopEquipInfo from "./PopEquipInfo";
import Starpos from "./Starpos";
import StarposConfirm from "./StarposConfirm";
import StarposResult from "./StarposResult";

type Props = {
  closeBtn: (flag: boolean) => void;
  finish: () => void;
  item: EquipInfo;
};

function EnchantUpgrade({ closeBtn, item, finish }: Props) {
  const [starpos, setStarpos] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [resultPop, setResultPop] = useState(false);
  const [effect, setEcffect] = useState(false);
  const [result, setResult] = useState("");
  const [starCatch, setStarCatch] = useState(false);  
  const [destroyDefend, setDestroyDefend] = useState(false);
  const [showInfo, setShowInfo] = useState(false);    
  const percentUp = useRef(false);

  function starposStat() {
    if (item) {
      type levelType = 130 | 140 | 150 | 160 | 200;
      const level = Math.floor(item.level / 10) * 10 as levelType;
      return statIncrease[level < 130 ? 130 : level][item.starpos];
    }
  }

  function maintainOrDown() {
    const starpos = successPercentage[item?.starpos ?? 0];
    if (starpos < 15) {
      return "유지";
    } else {
      if (starpos % 5 == 0) {
        return "유지";
      }
      return "하락";
    }
  }

  // 스타포스, 이펙트 활성화 , confirm 창 닫기
  function startCheck(flag: boolean) {
    if (starCatch) {
      percentUp.current = false;
      setEcffect(flag);
    } else {
      setStarpos(flag);
    }
    setConfirm(false);
  }

  // 스타포스 후 결과
  function starposResult(flag: boolean) {        
    percentUp.current = flag;
    setStarpos(false);
    setEcffect(true);
  }

  // 강화중 이펙트
  function upgradeEffect() {
    const element = document.getElementById("enchantImg");
    const top = element?.offsetTop ?? 0;
    const left = element?.offsetLeft ?? 0;
    if (effect) {
      return (
        <StarposEffect
          top={top}
          left={left}
          clear={() =>
            nextTick(() => {
              setEcffect(false);
              setResultPop(true);
              percentCal();
            })
          }
        />
      );
    }
  }

  // 스타포스 확률 계산
  function percentCal() {    
    if (item?.starpos != undefined) {
      
      let success = successPercentage[item.starpos];
      let fail = failPercentage[item.starpos];
      const randomValue = Math.random() * 100;
      const starpos = item.starpos;

      if (percentUp.current) {
        success = Number((success * 0.05).toFixed(2)) + success;
        fail = fail - Number((fail * 0.05).toFixed(2));
      }

      console.log('success : ' + success);
      console.log('fail : ' + fail)

      // 파괴확률 없을때
      if (item.starpos < 15) {
        if (randomValue < success) {
          item.starpos += 1;
          setResult("성공");
        } else {
          setResult("실패");
        }
      } else {
        if (randomValue < success) {
          item.starpos += 1;
          setResult("성공");
        } else if (randomValue < success + fail) {
          if (starpos % 5 != 0) {
            item.starpos -= 1;
          }
          setResult("실패");
        } else {
          if (destroyDefend) {
            setResult("실패");  
          } else {
            item.starpos = -999;
            setResult("파괴");
          }
        }
      }

      if(item.starpos == item.maxStarpos) {
        item.starposFinish = true;
        finish();
      }
    }
  }

  return (
    <>
      <div>메소를 사용하여 장비를 강화합니다.</div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <img
            style={{ width: "100px", height: "100px" }}
            src={item.img}
            id="enchantImg"
            onMouseOver={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          ></img>
          {showInfo && <PopEquipInfo equipInfo={item} />}
          {upgradeEffect()}
        </div>
        <div style={{ width: "50%", overflow: 'auto', height: '100px' }}>
          <div>
            {item.starpos ?? 0}성 &gt; {(item.starpos ?? 0) + 1}성
          </div>
          <div>
            성공확률 : {successPercentage[item.starpos ?? 0]}%
          </div>
          <div>
            실패({maintainOrDown()})확률 :{" "}
            {failPercentage[item.starpos ?? 0]}%
          </div>
          <div>
            {item.starpos >= 15 ? `파괴확률 : ${destroyPercentage[item.starpos ?? 0]} %` : ''}
          </div>
          <div>
            {statType.map((e) => <div key={e}>{e.toUpperCase()} : +{starposStat()}</div>)}
          </div>
        </div>
      </div>
      스타캐치 해제
      <input
        type="checkbox"
        onChange={(e) => setStarCatch(e.target.checked)}
      />
      파괴방지
      <input type="checkbox"
        onChange={(e) => setDestroyDefend(e.target.checked)}
        disabled={item.starpos < 15} />
      <div>필요한 메소 : 1010,210</div>
      <button
        onClick={() => setConfirm(true)}
        disabled={effect || resultPop}
      >
        강화
      </button>
      <button
        onClick={() => closeBtn(false)}
        disabled={effect || resultPop}
      >
        취소
      </button>
      {starpos && <Starpos item={item} isResult={(e) => starposResult(e)}/>}
      {confirm && <StarposConfirm start={(e) => startCheck(e)} />}
      {(resultPop && !effect) && <StarposResult result={result} isShow={() => setResultPop(false)} />}
    </>
  );
}

export default EnchantUpgrade;