// CREATE TABLE `equip_info` (
//     `seq` int NOT NULL AUTO_INCREMENT,
//     `type` varchar(100) DEFAULT NULL,
//     `orders` int DEFAULT NULL,
//     `name` varchar(100) DEFAULT NULL,
//     `level` int DEFAULT NULL,
//     `img_url` varchar(400) DEFAULT NULL,
//     `starpos` int DEFAULT NULL,
//     `starpos_finish` TINYINT(1) DEFAULT NULL,
//     `max_starpos` int DEFAULT NULL,
//     `change_count` int DEFAULT NULL,
//     `is_change`TINYINT(1) DEFAULT NULL,
//     `upgrade_count` int DEFAULT NULL,
//     `job` varchar(100) DEFAULT NULL,
//     `equip_type` varchar(100) DEFAULT NULL,
//     `destroy` TINYINT(1) DEFAULT FALSE,
//     `user_id` varchar(50) DEFAULT NULL,
//     PRIMARY KEY (`seq`)
//   );
  
//   CREATE TABLE `spend_info` (
//     `seq` int NOT NULL AUTO_INCREMENT,
//     `type` varchar(100) DEFAULT NULL,
//     `orders` int DEFAULT NULL,
//     `name` varchar(100) DEFAULT NULL,
//     `description` varchar(255) DEFAULT NULL,
//     `count` int DEFAULT NULL,
//     `img_url`varchar(400) DEFAULT NULL,
//     `user_id` varchar(50) DEFAULT NULL,
//     PRIMARY KEY (`seq`)
//   );
  
//   CREATE TABLE `etc_info` (
//     `seq` int NOT NULL AUTO_INCREMENT,
//     `type` varchar(100) DEFAULT NULL,
//     `orders` int DEFAULT NULL,
//     `name` varchar(100) DEFAULT NULL,
//     `description` varchar(255) DEFAULT NULL,  
//     `img_url`varchar(400) DEFAULT NULL,
//     `user_id` varchar(50) DEFAULT NULL,
//     PRIMARY KEY (`seq`)
//   );
  
//   CREATE TABLE `cash_info` (
//     `seq` int NOT NULL AUTO_INCREMENT,
//     `type` varchar(100) DEFAULT NULL,
//     `orders` int DEFAULT NULL,
//     `name` varchar(100) DEFAULT NULL,
//     `level` int DEFAULT NULL,   
//     `img_url`varchar(400) DEFAULT NULL,
//     `user_id` varchar(50) DEFAULT NULL,
//     PRIMARY KEY (`seq`)
//   );
  
//   drop table stats;
  
//   create table `stats` (
//       `item_seq` int not null,
//       `str` int DEFAULT null,
//       `dex` int DEFAULT null,
//       `ints` int DEFAULT null,
//       `luk` int DEFAULT null,
//       `power` int DEFAULT null,
//       `max_hp` int DEFAULT null,
//       `max_mp` int DEFAULT null,
//       `all_stat` int DEFAULT null,
//       `magic_power` int DEFAULT null,
//       `boss_power` int DEFAULT null,
//       `guard_ignore` int DEFAULT null,
//       PRIMARY KEY (`item_seq`)
//   );
  
//   INSERT INTO starpos.equip_info
//   (seq, `type`, orders, name, `level`, img_url, starpos, starpos_finish, max_starpos, change_count, is_change, upgrade_count, job, equip_type, destroy, user_id)
//   VALUES(1, 'equip', 1, '이글아이 워리어 아머', 150, '/images/lutavis-thief-top.png', 0, 0, 25, 0, 0, 0, 'warrior', 'top', 0, 'admin');
//   INSERT INTO starpos.equip_info
//   (seq, `type`, orders, name, `level`, img_url, starpos, starpos_finish, max_starpos, change_count, is_change, upgrade_count, job, equip_type, destroy, user_id)
//   VALUES(2, 'equip', 2, '검', 1, '/images/sword.png', 0, 0, 5, 0, 0, 0, 'all', 'weapon', 0, 'admin');
  
//   INSERT INTO starpos.spend_info
//   (seq, `type`, orders, name, description, count, img_url, user_id)
//   VALUES(0, 'spend', 1, '빨간포션', '이것은 빨간포션 입니다', 1, '/images/redportion.png', 'admin');
  
//   INSERT INTO starpos.etc_info
//   (seq, `type`, orders, name, description, img_url, user_id)
//   VALUES(0, 'etc', 1, '주문의 흔적', '낡은 종이에 과거에 사용했던 주문의 흔적이 남아있다. 상점에 팔면 약간의 메소를 얻을수 있다.', '/images/spellTrace.png', 'admin');
  
  
//   INSERT INTO starpos.cash_info
//   (seq, `type`, orders, name, `level`, img_url, user_id)
//   VALUES(0, 'cash', 1, '죽음의 데스', 0, '/images/deathOfDie.png', 'admin');
  
//   INSERT INTO starpos.stats
//   (item_seq, str, dex, ints, luk, power, max_hp, max_mp, all_stat, magic_power, boss_power, guard_ignore)
//   VALUES(2, 20, 20, 20, 20, 20, 10, 10, 10, 10, 10, 10);

const baseUrl = 'http://localhost:5554/api/item';
import axios from "axios";
import { ItemInfo } from "../option/CommonItem";

export async function searchItem(userId: string, type: string) {
    const url = `${baseUrl}/search-${type}`    
    try {
        return (await axios.get(url,  {params: {userId: userId}})).data;
    } catch(e) {
        console.log(e);
    }
}

export async function upgradeItem(equip: ItemInfo, type: string) {
    const url = `${baseUrl}/upgrade-${type}`    
    try {
        return (await axios.post(url,  equip)).data;
    } catch(e) {
        console.log(e);
    }
}