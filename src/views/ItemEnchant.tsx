import { useRef, useState } from "react";
import { ItemInfo } from "../common/option/CommonItem";
import Starpos from "./Starpos";
import EnchantConfirm from "./EnchantConfirm";
import EnchantResult from "./EnchantResult";
import { starposPercentage } from "../common/option/CommonItem";
import EnchantEffect from "./EnchantEffect";

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
  const [effectClear, setEcffectClear] = useState(false);
  const [result, setResult] = useState(false);    
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
                성공확률 : {starposPercentage[item.equip?.starpos ?? 0]}%
              </div>
              <div>
                실패({maintainOrDown()})확률 :{" "}
                {100 - starposPercentage[item.equip?.starpos ?? 0]}%
              </div>
              {/* i */}
            </div>
          </div>
          스타캐치 해제
          <input type="checkbox" />
          파괴방지
          <input type="checkbox" />
          <div>필요한 메소 : 1010,210</div>
          <button onClick={() => setConfirm(true)}>강화</button>
          <button onClick={() => showFlag(false)}>취소</button>
        </div>
      );
    }
  }

  function maintainOrDown() {
    const starpos = starposPercentage[item?.equip?.starpos ?? 0];
    if (starpos < 15) {
      return "유지";
    } else {
      if (starpos % 5 == 0) {
        return "유지";
      }
      return "하락";
    }
  }

  function upgradeEffect() {
    const element = document.getElementById("enchantImg");
    const top = element?.offsetTop ?? 0;
    const left = element?.offsetLeft ?? 0;
    if (effect) {
      return (
        <EnchantEffect
          top={top}
          left={left}
          clear={(e) => setEcffectClear(e)}
        />
      );
    }
  }

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

  function starposPopup() {
    if (starpos) {
      return (
        <Starpos
          item={item}
          isShow={(e) => setStarpos(e)}
          success={(e) => resultCheck(e)}
          setItem={(e) => (item = e)}
        />
      );
    }
  }

  function resultCheck(flag: boolean) {
    setResult(flag);
    setResultPop(true);
  }

  function confirmPopup() {
    if (confirm) {
      return <EnchantConfirm start={(e) => startCheck(e)} />;
    }
  }

  function confirmResult() {
    setResultPop(false);    
  }

  function resultPopup() {
    if (resultPop) {
      return <EnchantResult result={result} isShow={() => confirmResult()} />;
    }
  }

  function startCheck(flag: boolean) {
    setStarpos(flag);
    setConfirm(false);
    // setEcffect(flag);
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
