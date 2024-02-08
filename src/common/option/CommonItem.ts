// export interface ItemInfo {
//     type: 'equip' | 'spend' | 'etc' | 'cash';
//     equip?: EquipInfo;
//     spend?: SpendInfo;
//     etc?: EtcInfo;
//     cash?: CashInfo;
// }
export type ItemInfo = EquipInfo | SpendInfo | EtcInfo | CashInfo;

export type itemType = 'equip' | 'spend' | 'etc' | 'cash';
export interface EquipInfo {    
    type: 'equip'
    order: number;
    name: string;
    level: number;
    starpos: number;
    maxStarpos: number;
    changeCount?: number;
    upgradeCount?: number;
    changeYn?: boolean;
    potential?: [];
    additional?: [];
    job: string;
    equipType: string;
    stats?: EquipStats;
    img: string;
}

export interface EquipStats {
    str?: number;
    dex?: number;
    int?: number;
    luck?: number;
    power?: number;
    maxHp?: number;
    maxMp?: number;
    allStat?: number;
    magicPower?: number;
    bossPower?: number;
    guardIgnore?: number;
}

export interface SpendInfo {
    type: 'spend'
    order: number;
    name: string;
    description: string;
    count: number;
    img: string;
}

export interface EtcInfo {
    type: 'etc'
    order: number;
    name: string;
    description: string;
    count: number;
    img: string;
}

export interface CashInfo {
    type: 'cash'
    order: number;
    name: string;
    level: number;
    str?: number;
    dex?: number;
    int?: number;
    luck?: number;
    power?: number;
    magicPower?: number;
    bossPower?: number;
    guardIgnore?: number; 
    img: string;
} 
                    
export const successPercentage = [95,90,85,85,80,75,70,65,60,55,50,45,40,35,30,30,30,30,30,30,30,30,30,3,2,1];
export const failPercentage = [5,10,15,15,20,25,30,35,40,45,50,55,60,65,70,67.9,67.9,67.2,67.2,0,63,77.6,68.6,59.4];
export const destroyPercentage: {[key: number]: number}=  {
    [15]: 2.1,
    [16]: 2.1,
    [17]: 2.1,
    [18]: 2.8,
    [19]: 2.8,
    [20]: 7,
    [21]: 7,
    [22]: 19.4,
    [23]: 39.6,
};
export const statIncrease = [2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,7,7,7,7,7,7,7]

// 방어구 공 130 : 7로 시작 +10 마다 1씩증가 , 21성에서 2씩증가

export const equipData :ItemInfo[] = [
    // 검
    {
        type: 'equip',
        order: 1,
        name: '검',
        level: 1,
        starpos: 0,
        maxStarpos: 5,
        job: 'all',
        equipType: 'weapon',
        stats: {
            str: 3,
            dex: 3,
            int: 3,
            luck: 3,
            power: 15,                                    
        },
        img: '/images/sword.png',     
        upgradeCount: 5,   
    },
    // 카루타 
    {
        type: 'equip',
        order: 2,
        name: '이글아이 워리어 아머',
        level: 150,
        starpos: 0,
        maxStarpos: 25,
        job: 'warrior',
        equipType: 'top',
        img: '/images/lutavis-thief-top.png',        
        upgradeCount: 7,
    },
    {
        type: 'spend',
        order: 1,
        name: '빨간포션',
        count: 1,
        description: '이것은 빨간포션 입니다',
        img: '/images/redportion.png',        
    },
    {
        type: 'cash',
        order: 2,
        name: '죽음의 데스',
        level: 0,
        img: '/images/deathOfDie.png',        
    },
    {
        type: 'etc',
        order: 1,
        name: '주문의 흔적',
        count: 9000,
        description: '낡은 종이에 과거에 사용했던 주문의 흔적이 남아있다. 상점에 팔면 약간의 메소를 얻을수 있다.',
        img: '/images/spellTrace.png',        
    },
];

