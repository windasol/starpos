
type Props = {
    start: (flag: boolean) => void;
}

function EnchantConfirm({start} :Props) {
    return (
        <div
            className="popup"
            style={{
                width: '300px',        
                height: '160px',                        
                marginLeft: '1.5em',
                marginTop: '4em',
                backgroundImage: 'url(/images/topUpgradeBackground.png)',
                borderRadius: '10px'
              }}>               
            <div style={{color: 'white', fontSize: '14px', marginTop: '2em'}}>
                <p>328,121,600 메소</p>    
                <p>강화 실패 시 강화 단계가하락 됩니다. <br/> 강화를 시도하시겠습니까?</p>    
            </div>
            <div style={{backgroundColor: 'white', borderRadius: '0 0 10px 10px', marginTop: '3em', padding : '7px'}}>
                <button style={{backgroundColor: 'lawngreen'}} onClick={() => start(true)}>확인</button>
                <button style={{backgroundColor: 'darkgray', marginLeft: '0.5em'}} onClick={() => start(false)}>취소</button>                
            </div>                            
        </div>
    );
}

export default EnchantConfirm;