// CREATE TABLE USERS (
//     seq INT AUTO_INCREMENT PRIMARY KEY,
//     userid VARCHAR(50),
//     userpw VARCHAR(50),
//     userName VARCHAR(100)
// );hujh



// CREATE TABLE `equip_info` (
//     `seq` int NOT NULL AUTO_INCREMENT,
//     `type` varchar(100) DEFAULT NULL,
//     `orders` int DEFAULT NULL,
//     `name` varchar(100) DEFAULT NULL,
//     `levels` int DEFAULT NULL,
//     `imgUrl` varchar(400) DEFAULT NULL,
//     `starpos` int DEFAULT NULL,
//     `starposFinish` TINYINT(1) DEFAULT NULL,
//     `maxStarpos` int DEFAULT NULL,
//     `changeCount` int DEFAULT NULL,
//     `isChange`TINYINT(1) DEFAULT NULL,
//     `upgradeCount` int DEFAULT NULL,
//     `job` varchar(100) DEFAULT NULL,
//     `equipType` varchar(100) DEFAULT NULL,
//     `userId` varchar(50) DEFAULT NULL,
//     PRIMARY KEY (`seq`)
//   );

// INSERT INTO starpos.equip_info
// (seq, `type`, orders, name, levels, imgUrl, starpos, starposFinish, maxStarpos, changeCount, isChange, upgradeCount, job, equipType, userId)
// VALUES(0, 'equip', 2, '이글아이 워리어 아머', 150, '', 0, 0, 0, 0, 0, 0, '', '', '');


// CREATE TABLE `spend_info` (
//     `seq` int NOT NULL AUTO_INCREMENT,
//     `type` varchar(100) DEFAULT NULL,
//     `orders` int DEFAULT NULL,
//     `name` varchar(100) DEFAULT NULL,
//     `description` varchar(255) DEFAULT NULL,
//     `count` int DEFAULT NULL,
//     `imgurl`varchar(400) DEFAULT NULL,
//     PRIMARY KEY (`seq`)
//   );

// INSERT INTO starpos.spend_info
// (seq, `type`, orders, name, description, count, imgurl)
// VALUES(0, 'spend', 1, '빨간포션', '이것은 빨간포션 입니다', 1, '/images/redportion.png');

  
//   CREATE TABLE `etc_info` (
//     `seq` int NOT NULL AUTO_INCREMENT,
//     `type` varchar(100) DEFAULT NULL,
//     `orders` int DEFAULT NULL,
//     `name` varchar(100) DEFAULT NULL,
//     `description` varchar(255) DEFAULT NULL,  
//     `imgurl`varchar(400) DEFAULT NULL,
//     PRIMARY KEY (`seq`)
//   );

// INSERT INTO starpos.etc_info
// (seq, `type`, orders, name, description, imgurl)
// VALUES(0, 'etc', 1, '주문의 흔적', '낡은 종이에 과거에 사용했던 주문의 흔적이 남아있다. 상점에 팔면 약간의 메소를 얻을수 있다.', '/images/spellTrace.png');
  
//   CREATE TABLE `cash_info` (
//     `seq` int NOT NULL AUTO_INCREMENT,
//     `type` varchar(100) DEFAULT NULL,
//     `orders` int DEFAULT NULL,
//     `name` varchar(100) DEFAULT NULL,
//     `level` int DEFAULT NULL,   
//     `imgurl`varchar(400) DEFAULT NULL,
//     PRIMARY KEY (`seq`)
//   );

// INSERT INTO starpos.cash_info
// (seq, `type`, orders, name, `level`, imgurl)
// VALUES(0, 'cash', 1, '죽음의 데스', 0, '/images/deathOfDie.png');

const baseUrl = 'http://localhost:5554/api/item';
import axios from "axios";

export async function searchEquip(userId: string) {
    const url = `${baseUrl}/searchEquip`
    try {
        return await axios.get(url,  {params: {userId: userId}});
    } catch(e) {
        console.log(e);
    }
}

export async function searchSpend(userId: string) {
    const url = `${baseUrl}/searchSpend`
    try {
        return await axios.get(url,  {params: {userId: userId}});
    } catch(e) {
        console.log(e);
    }
}