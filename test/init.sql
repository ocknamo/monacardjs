-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset` varchar(255) NOT NULL,
  `assetLongname` varchar(255) DEFAULT NULL,
  `assetGroup` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `issuer` varchar(255) DEFAULT NULL,
  `imgur` varchar(255) DEFAULT NULL,
  `description` varchar(6000) DEFAULT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'good' COMMENT 'good or reason of ban',
  `tag` varchar(255) NOT NULL DEFAULT '',
  `cid` varchar(255) NOT NULL,
  `ver` varchar(255) NOT NULL DEFAULT '1',
  `txHash` varchar(255) NOT NULL COMMENT '登録時のissuanceのtxハッシュ',
  `txIndex` bigint DEFAULT NULL COMMENT '登録時のtx index',
  `registTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9462af55721068a9e0eb47aa72` (`asset`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (1,'asset_01','assetLongname_01','assetGroup_01','name_01','issuer_01','imgur_01','description_01','copyright','tag_01','cid_01','ver_01','txHash_01',9999,'2022-07-17 16:10:28.940890','2022-07-17 16:10:28.940890'),(2,'asset_02','assetLongname_02','assetGroup_02','name_02','issuer_02','imgur_02','description_02','good','tag_02','cid_02','ver_02','txHash_02',9999,'2022-07-17 16:10:28.948218','2022-07-17 16:10:28.948218'),(3,'asset_03','assetLongname_03','assetGroup_03','name_03','issuer_03','imgur_03','description_03','publicity','tag_03','cid_03','ver_03','txHash_03',9999,'2022-07-17 16:10:28.952433','2022-07-17 16:10:28.952433');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-18  1:11:58
