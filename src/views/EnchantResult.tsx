
type Props = {
    result: string;
    isShow: (flag: boolean) => void;
}

function EnchantResult({result, isShow} :Props) {
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
                <p>강화에 {result} 하였습니다!</p>                    
            </div>
            <div style={{backgroundColor: 'white', borderRadius: '0 0 10px 10px', marginTop: '3.5em', padding : '7px'}}>
                <button style={{backgroundColor: 'lawngreen'}} onClick={() => isShow(false)}>확인</button>         
            </div>                            
        </div>
    );
}

export default EnchantResult;