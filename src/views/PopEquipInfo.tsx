import { EquipInfo, EquipStats, powerIncrease, statIncrease, statType } from "../common/option/CommonItem";
import { job, jobBind } from "../common/option/JobOption";

type Props = {
  equipInfo: EquipInfo;
}

function PopEquipInfo({ equipInfo }: Props) {

  function showStar() {
    const star = [];
    for (let i = 1; i <= equipInfo.maxStarpos; i++) {
      if (i == 16) star.push(<br key={i + 500} />);
      i > equipInfo.starpos ? star.push(<img src='/images/noneStar.png' style={{ width: '13px', height: '13px' }} key={i} />)
        : star.push(<img src='/images/star.png' style={{ width: '13px', height: '13px' }} key={i} />);
      if (i % 5 == 0) star.push(<span key={i + 100}> </span>);
    }
    return star;
  }

  function showEquipPower() {
    type levelType = 130 | 140 | 150 | 160 | 200;
    const level = Math.floor(equipInfo.level / 10) * 10 as levelType;

    const starposPower = level < 130 ? 0 : powerIncrease[level].slice(0, equipInfo.starpos).reduce((acc, val) => acc + val, 0);
    const totalPower = equipInfo.stats?.power ?? 0 + starposPower;
    const totalMagic = equipInfo.stats?.magicPower ?? 0 + starposPower;

    return (
      <div style={{ fontSize: '14px', marginRight: '12em' }}>
        <div>
          {totalPower > 0 ? `공격력 : ${totalPower} ${starposPower > 0 ? `(${equipInfo.stats?.power ?? 0} + ${starposPower})` : ''}` : ''}
        </div>
        <div>
          {totalMagic > 0 ? `마력 : ${totalMagic} ${starposPower > 0 ? `(${equipInfo.stats?.magicPower ?? 0} + ${starposPower})` : ''}` : ''}
        </div>
      </div>
    )
  }

  function showEquipStat() {
    type levelType = 130 | 140 | 150 | 160 | 200;
    const level = Math.floor(equipInfo.level / 10) * 10 as levelType;
    const starpos = equipInfo.starpos;
    const starposStat = statIncrease[level < 130 ? 130 : level].slice(0, starpos).reduce((acc, val) => acc + val, 0);

    if (starpos > 0) {
      return statType.map((e) => 
        <div key={e} style={{ fontSize: '14px', marginRight: '12em' }}>{e.toUpperCase()} : {(equipInfo.stats?.[e as keyof EquipStats] ?? 0) + starposStat} ({equipInfo.stats?.[e as keyof EquipStats] ?? 0} + {starposStat})</div>
      );
    } else {  
      if (!equipInfo.stats) return [];

      return Object.entries(equipInfo.stats)
      .filter(([key]) => statType.includes(key))
      .map(([key, baseStat]) => (
        <div key={key} style={{ fontSize: '14px', marginRight: '12em' }}>
          {`${key.toUpperCase()} : ${baseStat}`}
        </div>
      ));
    }
  }

  function equipJobAble(job: string, jobCheck: string) {
    let colors = job == jobCheck ? 'white' : 'gray';
    if (jobCheck == 'all') colors = 'white';
    return (
      <span key={job} style={{ color: colors }}>{job} </span>
    );
  }

  return (
    <div className='itemInfo' style={{ backgroundColor: 'black', color: 'white', borderRadius: '10px' }}>
      {showStar()}
      <div style={{ fontWeight: 'bold' }}>{equipInfo.name}</div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <img className="showItemIng" src={equipInfo.img}></img>
        </div>
        <div>
          <div style={{ fontSize: '10px' }}>REQ LEV : {equipInfo.level}</div>
        </div>
      </div>
      <div style={{ fontSize: '14px' }}>
        {job.map((job) => equipJobAble(job, jobBind[equipInfo.job]))}
      </div>
      <div style={{ border: '1px solid #464646', width: '100%', borderStyle: 'dotted' }}></div>
      <div style={{ fontSize: '14px', marginRight: '7.5em' }}>장비분류 : {equipInfo.equipType}</div>
      {showEquipStat()}
      {showEquipPower()}
      <div style={{ fontSize: '14px', marginRight: '7em' }}>업그레이드 가능 횟수 : {equipInfo.upgradeCount}</div>
    </div>
  )
}

export default PopEquipInfo;