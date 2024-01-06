export interface ItemInfo {
    type: string;
    equip?: EquipInfo;
    spend?: SpendInfo;
    etc?: EtcInfo;
    cash?: CashInfo;
}

export interface EquipInfo {
    order: number;
    name: string;
    level: number;
    starpos: number;
    changeCount?: number;
    upgradeCount?: number;
    changeYn?: boolean;
    potential?: [];
    additional?: [];
    job?: string;
    stats?: EquipStats;
}

export interface EquipStats {
    str?: number;
    dex?: number;
    int?: number;
    luck?: number;
    power?: number;
    magicPower?: number;
    bossPower?: number;
    guardIgnore?: number;
}

export interface SpendInfo {
    order: number;
    name: string;
    description: string;
    count: number;
}

export interface EtcInfo {
    order: number;
    name: string;
    description: string;
    count: number;
}

export interface CashInfo {
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
} 

export const equipData :ItemInfo[] = [
    // 검
    {
        type: 'equip',
        equip: {
            order: 1,
            name: 'sword',
            level: 100,
            starpos: 0,
        },
    },
    // 카루타 
    {
        type: 'equip',
        equip :  {
            order: 2,
            name: 'cloth',
            level: 150,
            starpos: 0,

        }
    },
    {
        type: 'spend',
        spend : {
            order: 1,
            name: 'red portion',
            count: 1,
            description: '이것은 빨간포션 입니다',
        }
    },
    {
        type: 'cash',
        cash: {
            order: 2,
            name: 'master label',
            level: 0,
        }
    },
    {
        type: 'etc',
        etc: {
            order: 1,
            name: 'newbie book',
            count: 1,
            description: '초보자를 위한 육성 가이드 입니다!'
        }
    },
];

