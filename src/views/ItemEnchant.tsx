import { useState } from "react";
import { ItemInfo } from "../common/CommonItem";

type Props = {    
    showFlag: (flag: boolean) => void;   
    moveFlag: (flag: boolean) => void; 
    item?: ItemInfo;
}

function ItemEnchant({showFlag, moveFlag, item} : Props) {    
    const [itemFlag, setItemFlag] = useState(false);

    function enchant() {
        if (item && itemFlag) {
            return (
            <div style={{width: '343px', height: '283px'}}>
                <button>주문서</button>
                <button>스타포스 강화</button>
                <button>장비전승</button>
                <div>메소를 사용하여 장비를 강화합니다.</div>
    
                <div style={{display: 'flex'}}>
                    <div style={{width: '50%'}}><img src={item.equip?.img}></img></div>
                    <div style={{width: '50%'}}>
                        <div>22 > 23</div>
                        <div>성공확률 : 3.0%</div>
                        <div>실패(하락)확률 : 77.6%</div>
                        <div>파괴확률 : 19.4%</div>
                    </div>
                </div>
                스타캐치 해제<input type="checkbox"/>
                파괴방지<input type="checkbox"/>
                <div>필요한 메소 : 1010,210</div>
                <button>확인</button>
                <button>취소</button>
            </div>
            )
        } else {

        }
    }

    return (
        <div className="noneDrag">
            <div className="centered-container">
                <div className='itemTop' onMouseDown={(e) => moveFlag(true)}  onMouseUp={(e) => moveFlag(false)}>
                    <div style={{width: '80%', marginLeft: '3em'}}>Equipment Enchant</div>
                    <div style={{width: '20%', cursor: 'pointer'}} onClick={() => {showFlag(false)}}>x</div>
                </div>
                <div onMouseOver={() => item ? setItemFlag(true) : setItemFlag(false)}>    
                    {itemFlag ? '' : <img src="/images/inner-starpos.png" draggable={false}></img>}                                 
                </div>    
            {enchant()}
            </div>
        </div>
    )
}

export default ItemEnchant;