import React from "react";

type Props = {    
    showFlag: (flag: boolean) => void;   
    moveFlag: (flag: boolean) => void; 
}

function ItemEnchant({showFlag, moveFlag} : Props) {    
    return (
        <div className="noneDrag">
            <div className="centered-container">
                <div className='itemTop' onMouseDown={(e) => moveFlag(true)}>
                    <div style={{width: '80%', marginLeft: '3em'}}>Equipment Enchant</div>
                    <div style={{width: '20%', cursor: 'pointer'}} onClick={() => {showFlag(false)}}>x</div>
                </div>
                <div>                    
                    <img src="/images/inner-starpos.png" draggable={false}></img>                    
                </div>    
            </div>
        </div>
    )
}

export default ItemEnchant;