export interface ItemInfo {
    order: number;
    type: string
    name: string;
    level: number;
    starpos : number;
    potential : [];
    additional: [];
  }

export const equipData :ItemInfo[] = [
    // 검
    {
        order: 1,
        type: 'equip',
        name: 'sword',
        level: 100,
        starpos: 0,
        potential: [],
        additional: [],
    },
    // 카루타 
    {
        order: 2,
        type: 'equip',
        name: 'cloth',
        level: 150,
        starpos: 0,
        potential: [],
        additional: [],
    },
];

