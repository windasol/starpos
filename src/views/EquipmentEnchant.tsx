import { useState } from "react";
import { EquipInfo } from "../common/option/CommonItem";
import EnchantUpgrade from "./starpos/StarposUpgrade";
import EquipTransmission from "./EquipTransmission";
import EquipSpellUpgrade from "./EquipSpellUpgrade";
import axios from "axios";

type Props = {
  closeBtn: (flag: boolean) => void;
  moveFlag: (flag: boolean) => void;
  item?: EquipInfo;
};

function EquipmentEnchant({ closeBtn, moveFlag, item }: Props) {
  const [btnType, setBtnType] = useState(item?.starposFinish ? 'c' : 'b')

  function typeStyle(type: string) {
    return btnType == type ? { backgroundColor: 'green' } : {};
  }
  

  async function test() {        
    // const dd = await axios.get('http://localhost:5554/api/equip/search',  {params: {userId: 'admin'}});
    // console.log(dd.data);
    
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
              closeBtn(false);
            }}
          >
            x
          </div>
        </div>
        <div>{!item && <img src="/images/inner-starpos.png" draggable={false}></img>}</div>
        {item &&
          <div className="equipEnchant">
            <div>
              <button className="enchantBtn" style={typeStyle('a')} onClick={() => setBtnType('a')}>주문서</button>
              <button className="enchantBtn" style={typeStyle('b')} onClick={() => setBtnType('b')} disabled={item?.starposFinish} >스타포스 강화</button>
              <button className="enchantBtn" style={typeStyle('c')} onClick={() => setBtnType('c')}>장비전승</button>
              <button className="enchantBtn" onClick={() => test()}>테스트</button>
            </div>
            <div>
              {btnType == 'a' && <EquipSpellUpgrade />}
              {btnType == 'b' && !item.starposFinish && <EnchantUpgrade item={item as EquipInfo} closeBtn={() => closeBtn(false)} finish={() => setBtnType('c')}/>}
              {btnType == 'c' && <EquipTransmission />}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default EquipmentEnchant;
