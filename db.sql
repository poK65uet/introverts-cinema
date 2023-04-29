-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: introverts_cinema
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actor`
--

DROP TABLE IF EXISTS `actor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `birth_day` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `nationality_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nationality_id` (`nationality_id`),
  CONSTRAINT `actor_ibfk_1` FOREIGN KEY (`nationality_id`) REFERENCES `nationality` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actor`
--

LOCK TABLES `actor` WRITE;
/*!40000 ALTER TABLE `actor` DISABLE KEYS */;
INSERT INTO `actor` VALUES (1,'Sam Worthington','1976-08-02','2022-12-17 14:01:12','2022-12-17 14:35:04',11),(2,'Zoe Saldana','1978-06-19','2022-12-17 14:37:00','2022-12-17 14:37:00',2),(3,'Kate Winslet','1975-10-05','2022-12-17 14:39:05','2022-12-17 14:39:05',11),(4,'Sigourney Weaver','1949-10-08','2022-12-17 14:39:55','2022-12-17 14:39:55',2),(5,'Stephen Lang','1952-07-11','2022-12-17 14:40:51','2022-12-17 14:40:51',2),(6,'Zachary Levi','1980-09-29','2022-12-17 14:43:41','2022-12-17 14:43:41',2),(7,'Rachel Zegler','2001-05-03','2022-12-17 14:44:19','2022-12-17 14:44:19',2),(8,'Helen Mirren','1945-07-26','2022-12-17 14:44:58','2022-12-17 14:44:58',11),(9,'Lucy Liu','1968-09-02','2022-12-17 14:45:32','2022-12-17 14:45:32',2),(10,'Hoàng Yến Chibi','1995-08-12','2022-12-17 14:47:05','2022-12-17 14:47:05',1),(11,'Sam','1990-10-28','2022-12-17 14:48:22','2022-12-17 14:48:22',1),(12,'NSND Kim Xuân','1956-08-26','2022-12-17 14:49:30','2022-12-17 14:49:30',1),(13,'Phạm Huỳnh Hữu Tài',NULL,'2022-12-17 14:50:00','2022-12-17 14:50:00',1),(14,'Dược Sĩ Tiến',NULL,'2022-12-17 14:50:35','2022-12-17 14:50:35',1),(15,'Titi Kamal','1981-12-07','2022-12-17 14:52:13','2022-12-17 14:52:13',7),(16,'Syifa Hadju','2000-07-13','2022-12-17 14:52:52','2022-12-17 14:52:52',7),(17,'Giulio Parengkuan','1999-07-20','2022-12-17 14:53:17','2022-12-17 14:53:17',7),(18,'Lee Jong Suk','1989-09-14','2022-12-17 14:54:28','2022-12-17 14:54:28',4),(19,'Kim Rae Won','1981-03-19','2022-12-17 14:55:08','2022-12-17 14:55:08',4),(20,'Park Byung Eun','1977-07-14','2022-12-17 14:56:08','2022-12-17 14:56:08',4),(21,'Cha Eun Woo','1997-03-30','2022-12-17 14:56:47','2022-12-17 14:56:47',4),(22,'Stephen Thomas Ochsner','1988-07-25','2022-12-17 14:58:58','2022-12-17 14:58:58',8),(23,'Bernard Jacobsen',NULL,'2022-12-17 14:59:18','2022-12-17 14:59:18',8),(24,'Daniel Medvedev',NULL,'2022-12-17 14:59:28','2022-12-17 14:59:28',8),(25,'Salma Hayek','1966-09-02','2022-12-17 15:02:14','2022-12-17 15:02:14',13),(26,'Antonio Banderas','1960-08-10','2022-12-17 15:02:54','2022-12-17 15:02:54',12),(27,'Florence Pugh','1996-01-03','2022-12-17 15:03:23','2022-12-17 15:03:23',11),(28,'Peach Pachara Chirathivat','1993-05-10','2022-12-17 15:04:59','2022-12-17 15:04:59',5),(29,'Wongravee Nateetorn','1998-06-25','2022-12-17 15:05:28','2022-12-17 15:05:28',5),(30,'Plearnpichaya Komalarajun','2000-07-04','2022-12-17 15:05:50','2022-12-17 15:05:50',5),(31,'Tóc Tiên','1989-05-13','2022-12-17 15:06:43','2022-12-17 15:06:43',1),(32,'Đồng Ánh Quỳnh','1995-01-01','2022-12-17 15:07:18','2022-12-17 15:07:18',1),(33,'Rima Thanh Vy','1995-03-08','2022-12-17 15:07:50','2022-12-17 15:07:50',1),(34,'Ngô Thanh Vân','1979-02-26','2022-12-17 15:08:52','2022-12-17 15:08:52',1),(35,'Mạc Văn Khoa','1992-05-04','2022-12-17 15:10:16','2022-12-17 15:10:16',1),(36,'Anh Tú','1993-10-03','2022-12-17 15:10:40','2022-12-17 15:10:40',1),(37,'Lupita Nyong\'o','1980-08-19','2022-12-17 15:18:07','2022-12-17 15:18:07',2),(38,'Angela Bassett','1958-08-16','2022-12-17 15:18:28','2022-12-17 15:18:28',2),(39,'Danai Gurira','1978-02-14','2022-12-17 15:18:59','2022-12-17 15:18:59',2),(40,'Martin Freeman','1971-09-08','2022-12-17 15:20:27','2022-12-17 15:20:27',11),(41,'Dwayne Johnson','1972-05-02','2022-12-17 15:23:32','2022-12-17 15:23:32',2),(42,'Pierce Brosnan','1953-05-16','2022-12-17 15:24:01','2022-12-17 15:24:02',2),(43,'Sarah Shahi','1980-01-10','2022-12-17 15:24:29','2022-12-17 15:24:29',2),(44,'Kim Woo Bin','1989-07-16','2022-12-17 15:34:24','2022-12-17 15:34:24',4),(45,'Kim Tae Ri','1990-04-24','2022-12-17 15:34:53','2022-12-17 15:34:53',4),(46,'Alif Satar','1990-09-19','2022-12-17 15:37:44','2022-12-17 15:37:44',6),(47,'Ikmal Amry','1994-07-02','2022-12-17 15:38:06','2022-12-17 15:38:06',6),(48,'Abbas Mahmood',NULL,'2022-12-17 15:38:20','2022-12-17 15:38:20',6),(49,'So Ji Sub','1977-11-04','2022-12-17 15:40:27','2022-12-17 15:40:27',4),(50,'Kim Yu Jin','1988-04-09','2022-12-17 15:40:55','2022-12-17 15:40:55',4),(51,'Nana','1991-09-14','2022-12-17 15:41:23','2022-12-17 15:41:23',4),(52,'Phương Anh Đào','1992-04-30','2022-12-17 15:43:01','2022-12-17 15:43:01',1),(53,'Quang Tuấn',NULL,'2022-12-17 15:44:16','2022-12-17 15:44:16',1),(54,'David Harbour','1975-04-10','2022-12-17 15:47:24','2022-12-17 15:47:24',2),(55,'John Leguizamo','1960-07-22','2022-12-17 15:48:39','2022-12-17 15:48:39',15),(56,'Cam Gigandet','1982-08-16','2022-12-17 15:49:02','2022-12-17 15:49:02',2),(57,'NCT',NULL,'2022-12-17 15:51:36','2022-12-17 15:51:36',4),(58,'Trấn Thành','1987-02-05','2022-12-17 15:52:58','2022-12-17 15:52:58',1),(59,'NSND Ngọc Giàu','1945-07-13','2022-12-17 15:53:48','2022-12-17 15:53:48',1),(60,'Lê Dương Bảo Lâm','1989-07-11','2022-12-17 15:54:24','2022-12-17 15:54:24',1),(61,'Khả Như','1987-03-16','2022-12-17 15:55:17','2022-12-17 15:55:17',1),(62,'Nazuka Kaori','1985-04-24','2022-12-17 15:57:04','2022-12-17 15:57:04',3),(63,'Ikeda Shuichi','1949-12-02','2022-12-17 15:57:33','2022-12-17 15:57:33',3),(64,'Tanaka Mayumi','1955-01-15','2022-12-17 15:57:51','2022-12-17 15:57:51',3),(65,'Shawn Mendes','1998-08-08','2022-12-17 16:01:09','2022-12-17 16:01:09',9),(66,'Javier Bardem','1969-03-01','2022-12-17 16:01:45','2022-12-17 16:01:45',12),(67,'Winslow Fegley','2009-01-23','2022-12-17 16:02:19','2022-12-17 16:02:19',2);
/*!40000 ALTER TABLE `actor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner`
--

LOCK TABLES `banner` WRITE;
/*!40000 ALTER TABLE `banner` DISABLE KEYS */;
INSERT INTO `banner` VALUES (1,'https://cdn.galaxycine.vn/media/2022/11/29/combo-avatar2-digital-2048x682_1669695949280.jpg','active','2022-12-17 17:11:01','2022-12-17 17:11:01'),(2,'https://cdn.galaxycine.vn/media/2022/12/16/giangsinh-digital-2048x682_1671175460254.jpg','active','2022-12-17 17:13:58','2022-12-17 17:13:58'),(3,'https://cdn.galaxycine.vn/media/2022/12/16/2048x682_1671176015182.jpg','active','2022-12-17 17:14:44','2022-12-17 17:14:44');
/*!40000 ALTER TABLE `banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_price` bigint DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  `showtime_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `showtime_id` (`showtime_id`),
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`showtime_id`) REFERENCES `showtime` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_seat`
--

DROP TABLE IF EXISTS `bill_seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_seat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `bill_id` int DEFAULT NULL,
  `seat_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bill_seat_SeatId_BillId_unique` (`bill_id`,`seat_id`),
  KEY `seat_id` (`seat_id`),
  CONSTRAINT `bill_seat_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bill_seat_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `seat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_seat`
--

LOCK TABLES `bill_seat` WRITE;
/*!40000 ALTER TABLE `bill_seat` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill_seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Hành động','2022-12-16 19:38:51','2022-12-16 19:38:51'),(2,'Phiêu lưu','2022-12-16 19:39:00','2022-12-16 19:39:00'),(3,'Giả tưởng','2022-12-16 19:39:15','2022-12-16 19:39:15'),(4,'Kinh dị','2022-12-16 19:40:34','2022-12-16 19:40:34'),(5,'Tâm lí','2022-12-16 19:41:29','2022-12-16 19:41:29'),(6,'Giật gân','2022-12-16 19:41:40','2022-12-16 19:41:40'),(7,'Hoạt hình','2022-12-16 19:43:43','2022-12-16 19:43:43'),(8,'Hài hước','2022-12-16 19:44:59','2022-12-16 19:44:59'),(9,'Tình cảm','2022-12-16 19:46:46','2022-12-16 19:46:46'),(10,'Tội phạm','2022-12-17 10:10:56','2022-12-17 10:10:56'),(11,'Li kì','2022-12-17 10:16:46','2022-12-17 10:16:46'),(12,'Nhạc kịch','2022-12-17 10:23:30','2022-12-17 10:23:30'),(13,'Chính kịch','2022-12-17 10:38:33','2022-12-17 10:38:33');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `director`
--

DROP TABLE IF EXISTS `director`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `director` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `birth_day` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `nationality_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nationality_id` (`nationality_id`),
  CONSTRAINT `director_ibfk_1` FOREIGN KEY (`nationality_id`) REFERENCES `nationality` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `director`
--

LOCK TABLES `director` WRITE;
/*!40000 ALTER TABLE `director` DISABLE KEYS */;
INSERT INTO `director` VALUES (1,'James Cameron','1954-08-16','2022-12-17 14:05:45','2022-12-17 14:05:45',9),(2,'Lê Bình Giang',NULL,'2022-12-17 14:11:16','2022-12-17 14:11:16',1),(3,'Nguyễn Chung',NULL,'2022-12-17 14:16:44','2022-12-17 14:16:44',1),(4,'Kimo Stamboel','1980-06-25','2022-12-17 14:18:17','2022-12-17 14:18:17',7),(5,'Hwang In Ho',NULL,'2022-12-17 14:20:43','2022-12-17 14:20:43',4),(6,'Vasiliy Rovenskiy','1971-04-21','2022-12-17 14:22:08','2022-12-17 14:22:08',8),(7,'Joel Crawford',NULL,'2022-12-17 14:23:26','2022-12-17 14:23:26',2),(8,'Thitipong Kerdtongtawee',NULL,'2022-12-17 14:25:07','2022-12-17 14:25:07',5),(9,'Ngô Thanh Vân','1979-02-26','2022-12-17 14:26:56','2022-12-17 14:26:56',1),(10,'Võ Thanh Hòa','1989-12-04','2022-12-17 14:28:22','2022-12-17 14:28:22',1),(11,'David F. Sandberg','1981-01-21','2022-12-17 14:30:53','2022-12-17 14:30:53',10),(12,'Ryan Coogler','1986-05-23','2022-12-17 15:17:20','2022-12-17 15:17:20',2),(13,'Jaume Collet-Serra','1974-03-23','2022-12-17 15:26:41','2022-12-17 15:26:41',12),(14,'Choi Dong Hoon','1971-02-24','2022-12-17 15:33:24','2022-12-17 15:33:24',4),(15,'James Lee',NULL,'2022-12-17 15:36:29','2022-12-17 15:36:29',6),(16,'Yoon Jong Seok','1992-05-28','2022-12-17 15:39:49','2022-12-17 15:39:49',4),(17,'Bùi Thạc Chuyên',NULL,'2022-12-17 15:42:25','2022-12-17 15:42:25',1),(18,'Tommy Wirkola','1979-12-06','2022-12-17 15:46:27','2022-12-17 15:46:27',14),(19,'Yeji Margo Lee',NULL,'2022-12-17 15:50:59','2022-12-17 15:50:59',4),(20,'Trấn Thành','1987-02-05','2022-12-17 15:52:38','2022-12-17 15:52:38',1),(21,'Taniguchi Goro','1966-10-18','2022-12-17 15:56:29','2022-12-17 15:56:29',3),(22,'Will Speck','1959-12-31','2022-12-17 15:59:19','2022-12-17 15:59:19',2),(23,'Josh Gordon',NULL,'2022-12-17 15:59:50','2022-12-17 15:59:50',2);
/*!40000 ALTER TABLE `director` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film`
--

DROP TABLE IF EXISTS `film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `trailer_url` varchar(255) DEFAULT NULL,
  `duration` smallint DEFAULT NULL,
  `opening_day` datetime DEFAULT NULL,
  `description` text,
  `rated` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `nationality_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nationality_id` (`nationality_id`),
  CONSTRAINT `film_ibfk_1` FOREIGN KEY (`nationality_id`) REFERENCES `nationality` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film`
--

LOCK TABLES `film` WRITE;
/*!40000 ALTER TABLE `film` DISABLE KEYS */;
INSERT INTO `film` VALUES (1,'Avatar 2: Dòng Chảy Của Nước','https://cdn.galaxycine.vn/media/2022/12/15/1200x1800_1671120744078.jpg','https://www.youtube.com/watch?v=_CgHXISxU4E',192,'2022-12-15 17:00:00','	Những trích đoạn đầu tiên hé lộ diễn biến cuộc chiến tiếp theo giữa loài người và bộ tộc người Na’vi của hành tinh Pandora, vốn bắt đầu từ phần một. Hành tinh Pandora rực rỡ ở ngay phân cảnh đầu tiên. Tiếp đến, công chúa Neytiri (Zoe Saldana thủ vai) xuất hiện với đôi mắt tràn đầy cảm xúc dưới ánh nắng trong veo. Người xem được đi sâu vào khám phá hành tinh Pandora với nhiều cảnh quan đáng kinh ngạc, trong đó có dưới lòng đại dương sâu thẳm với những loài sinh vật kỳ bí, đúng như tên gọi của phần hai – The Way Of Water.\n	Năm 2009, bom tấn Avatar của đạo diễn James Cameron công phá phòng vé với doanh thu cao kỷ lục. Avatar như một cột mốc đáng nhớ trong lịch sử điện ảnh, được xem như cuộc cách mạng của công nghệ CGI và cả kỹ xảo 3D.\n	Thành công ngoài mong đợi trong “canh bạc” mạo hiểm mang tên Avatar chính là động lực để James Cameron tự tin với ý tưởng thực hiện Avatar: The Way Of Water.\n	Phần tiếp theo sẽ khai thác về thế giới dưới nước trên Pandora. Bối cảnh tại một vùng vịnh và lấy mốc thời gian cặp đôi Jake Sully và Neytiri đã có con với nhau. Đúng vào lúc này, mối đe dọa từ loài người ở Trái Đất đang cận kề, việc này bắt buộc họ phải tìm cách bảo vệ hành tinh của mình.\n	Do luôn có sự hứng thú với đại dương to lớn, nên chủ đề của Avatar phần mới được di chuyển xuống biển. Một hồ nước khổng lồ được xây dựng với mục đích phục vụ cho công tác quay phim. Bên cạnh đó, nhiều thiết bị ghi hình tối tân nhất cũng được trang bị để đảm bảo cho khâu hình ảnh chỉn chu nhất.\n	Có thể thấy Avatar: The Way Of Water hứa hẹn sẽ là siêu phẩm được mong chờ nhất trong thời gian sắp tới. Tác phẩm ra rạp vào 16.12.2022. Ngoài ra phần 3, 4, 5 cũng được ấn định ra rạp lần lượt vào 2024 – 2026 – 2028.\n\nPhim mới Avatar: The Way of Water ra mắt tại các rạp chiếu phim 12.2022.','C13','active','2022-12-16 18:46:52','2022-12-17 10:44:12',2),(2,'Đảo Độc Đắc - Tử Mẫu Thiên Linh Cái','https://cdn.galaxycine.vn/media/2022/11/24/dao-doc-dac-300x450_1669278316342.jpg','https://www.youtube.com/watch?v=U76D0Cr10IY',94,'2022-12-22 17:00:00','	Phiên bản Next Level của thứ b.ùa ng.ãi tâm linh từng rúng động một thời tung teaser poster đầy mùi liêu trai, ma mị với hình ảnh nhân ngư đầy bí ẩn. Bên cạnh đó, dự án quy tụ nhiều gương mặt vừa lạ vừa quen: Trần Nghĩa, Trần Phong, Minh Dự, Phương Lan và đặc biệt là 2 bóng hồng visual Sam, Hoa hậu Tiểu Vy hứa hẹn thổi vào luồng gió mới cho món ăn hấp dẫn lần này. \n	Đảo Độc Đắc - Tử Mẫu Thiên Linh Cái là phim kinh dị tâm linh bí ẩn và đen tối, diễn xuất của Sam trở thành yếu tố khiến người hâm mộ vô cùng trông đợi. Liệu trong vai diễn mới lần này, Sam có phá vỡ được hình tượng trong sáng, thánh thiện đã gắn liền với mình trong nhiều năm? Hay cô nàng sẽ mang đến những màn thể hiện quỷ dị và hắc ám khiến người hâm mộ phải “mắt chữ A, mồm chữ O” như thế nào, tất cả đều sẽ được giải đáp trong Đảo Độc Đắc - Tử Mẫu Thiên Linh Cái.','C18','active','2022-12-16 18:56:41','2022-12-17 10:45:27',1),(3,'Hạnh Phúc Máu','https://cdn.galaxycine.vn/media/2022/10/12/hpm_1665546188603.jpg','https://www.youtube.com/watch?v=_VQqMUKMBKQ',110,'2022-11-24 17:00:00','	Hạnh Phúc Máu kể về cuộc đời của Hà Phương (NSND Kim Xuân) và câu chuyện gia tộc Vương Đình với một đức tin lạ vận hành niềm tin, sự thịnh vượng của gia tộc. Vào sự kiện quan trọng của gia tộc hàng loạt thảm kịch xảy ra. Sự thật trần trụi về những người chung một dòng máu nhưng khác cuộc đời được phơi bày.\n\nPhim mới Hạnh Phúc Máu ra mắt tại các rạp chiếu phim toàn quốc từ 25.11.2022.','C18','active','2022-12-16 18:59:43','2022-12-17 10:48:48',1),(4,'Jailangkung: Búp Bê Gọi Hồn','https://cdn.galaxycine.vn/media/2022/12/5/300x450-jailang_1670224061728.jpg','https://www.youtube.com/watch?v=V2iuLaQNRY8',92,'2022-12-08 17:00:00','	Câu chuyện xoay quanh một gia đình nhỏ đang đi du lịch ra khỏi thành phố. Họ không lường trước được tai hoạ sẽ ập đến khi đi đường vòng đến một hồ nước gần đó. Tại đây, đứa con trai nhỏ tên là Kinan (Muzakki Ramdhan) đột nhiên mất tích đầy bí ẩn vào lúc mặt trời lặn. Mặc dù đã nhanh chóng gọi cứu hộ, song hy vọng tìm thấy Kinan vô cùng mong manh khi đa số những vụ mất tích trẻ em tại khu vực này đều không có dấu vết, hoặc tệ hơn, là tìm thấy trong tình trạng đã chết. Thứ duy nhất họ có được là một hình nhân búp bê Jailangkung, kể từ đây cả gia đình liên tiếp vướng vào những nỗi kinh hoàng bí ẩn không thể giải đáp. Chuyện gì đã xảy ra với Kinan? Liệu gia đình này có thể tìm thấy đứa con đã mất tích?\n\nPhim mới Jailangkung: Búp Bê Gọi Hồn, ra mắt tại các rạp chiếu phim từ 09.12.2022.','C18','active','2022-12-16 19:02:18','2022-12-17 10:48:29',7),(5,'Âm Lượng Huỷ Diệt','https://cdn.galaxycine.vn/media/2022/11/24/decibel-300x450_1669280686554.jpg','https://www.youtube.com/watch?v=7rItTYvS9cQ',109,'2022-12-08 17:00:00','	Tác phẩm xoay quanh nhân vật cựu phó đô đốc hải quân Kang Do Young (Kim Rae Won). Một ngày nọ, anh bị vướng vào chuỗi đánh bom khủng bố bằng bom phản ứng âm thanh được chế tạo bởi kẻ ẩn danh (Lee Jong Suk), Do Young phải chạy đua với thời gian để vừa vạch trần danh tính kẻ thủ ác, vừa chứng tỏ bản thân mình hoàn toàn trong sạch.\n\nPhim mới Âm Lượng Hủy Diệt, ra mắt tại các rạp chiếu phim từ 09.12.2022.','C13','active','2022-12-16 19:05:19','2022-12-17 10:49:38',4),(6,'Chuyến Đi Nhớ Đời: Tiểu Đội Gấu Bay','https://cdn.galaxycine.vn/media/2022/12/13/300x450_1670925395572.jpg','https://www.youtube.com/watch?v=qOP_CkRmfKQ',90,'2022-12-22 17:00:00','	Đã một năm kể từ khi chú gấu Mic-Mic và chú thỏ Oscar trở lại sau cuộc phiêu lưu kỳ thú của họ. Và lần này, hai người bạn của chúng ta sẽ lại một lần nữa dính vào “phi vụ bất đắc dĩ” khi từ trên trời rơi xuống một bé gấu nâu Grizzly buộc họ phải thực hiện nhiệm vụ giao bé về cho bố mẹ một cách an toàn. Kế hoạch này bị kền kền quỷ quyệt Vulture quyết tâm phá hoại. Mic Mic, Oscar, cậu thiếu niên Panda và chú cò Stork sẽ cùng nhau di chuyển bằng khinh khí cầu để bắt đầu một cuộc phiêu lưu mới, trả lại Grizzly bé nhỏ cha mẹ của nó, cứu cuộc bầu cử ở Mỹ và cả lục địa khỏi ngọn núi lửa đang phun trào.\n\nPhim mới Chuyến Đi Nhớ Đời: Tiểu Đội Gấu Bay, ra mắt tại các rạp chiếu phim từ 23.12.2022.','P','active','2022-12-16 19:11:36','2022-12-17 10:50:32',8),(7,'Mèo Đi Hia: Điều Ước Cuối Cùng','https://cdn.galaxycine.vn/media/2022/12/7/1200x1800_1670397246643.jpg','https://www.youtube.com/watch?v=fovTZDDPgAQ',103,'2022-12-29 17:00:00','	Chú mèo Puss giờ đây đã không thể ngạo nghễ chu du mà chẳng màng nguy hiểm như trước nữa, bởi cậu đã mất 8 trong 9 cuộc đời mà mình có. Và với tình hình này, việc đi tìm lại “điều ước cuối cùng” nhằm khôi phục lại các mạng sống trở nên khó khăn hơn bao giờ hết. Thật may cho cậu khi vẫn còn người bạn “lợi hại” sẵn sàng đồng hành – cô mèo Kitty, và một thành viên mới gia nhập, vô cùng “nhắng nhít” và nhiệt tình.\n	Sau khi mất đi mạng sống thứ 8, Puss được bác sĩ thú y khuyên nhủ tới nhà Mama Luna – một bà lão “nghiện” mèo chính hiệu và luôn mở cửa chào đón những chú mèo cưng mới. Dù tâm hồn cự tuyệt nhưng với tình thế gian nan hiện tại, Puss vẫn quyết định tới đó.Tại đây, anh đã gặp Perro – một chú chó trị liệu nhưng “đội lốt” mèo. Tưởng chừng mọi chuyện sẽ êm thấm, nhưng kẻ mà Puss đã từng gây thù chuốc oán vẫn tìm đến tận nơi – cô bé tóc vàng cùng gia đình gấu. Cũng từ lúc này, Perro đã biết được chú mèo nhỏ nhắn chính là Mèo Đi Hia đầy lợi hại vô cùng đáng ngưỡng mộ.\n	Dù tẩu thoát thành công khỏi nhà Mama Luna và tránh được hội “đầu gấu” một phen, Puss đã bị truy nã treo thưởng và bị kẻ săn tiền thưởng hiểm ác Sói Xám truy đuổi. Lúc này đây là một màn “mỹ nhân cứu anh hùng” tới từ cô nàng Kitty Scott Paws. Cùng với sự hỗ trợ của Perro, chuyến phiêu lưu của bộ ba liệu có thể toàn mạng hoàn thành ? \n\nPhim mới Puss In Boots 2 ra mắt tại các rạp chiếu phim toàn quốc từ 30.12.2022.','P','active','2022-12-16 19:17:01','2022-12-16 19:45:23',2),(8,'Quyết Tâm Cua Em','https://cdn.galaxycine.vn/media/2022/12/8/300x450-omg_1670471916953.jpg','https://www.youtube.com/watch?v=9U7fkTY6HRY',124,'2022-12-22 17:00:00','	Guy là một chàng trai vụng về trong tình trường hay nói cách khác là “ế nhờ thực lực”. Cậu đem lòng yêu đơn phương June, một hot girl bậc nhất của trường, nổi tiếng với lời đồn là “tráp gơ” - thuật ngữ giới trẻ dùng để chỉ những cô gái thích chơi đùa tình cảm người khác. Tuy nhiên, Guy lại mặc kệ lời cảnh tỉnh mà rơi vào lưới tình của June, nhưng số phận trớ trêu đã cản bước họ đi đến một mối quan hệ yêu đương ra trò.\n	Trong khi Guy độc thân, June đang có bạn trai. Khi June vừa kết thúc mối quan hệ của mình, Guy lại đang “thử yêu” một cô gái khác. Khi Guy quyết định chia tay, June lại có bạn trai mới! Cứ thế, họ lựa chọn sẽ coi nhau như những người bạn mà không thể gặp nhau ở “giao điểm” tình yêu. Liệu sự quyết tâm “cuồng si” của Guy có đủ sức biến mối quan hệ này thành “đúng người, đúng thời điểm”?\n\nPhim mới Quyết Tâm Cua Em, ra mắt tại các rạp chiếu phim từ 23.12.2022.','C16','active','2022-12-16 19:22:28','2022-12-17 10:53:44',5),(9,'Thanh Sói','https://cdn.galaxycine.vn/media/2022/12/16/111_1671162543814.jpg','https://www.youtube.com/watch?v=4-C5mC0uSyE',109,'2022-12-29 17:00:00','	Lấy bối cảnh Sài Gòn 1998, phim là tiền truyện của Hai Phượng kể về hành trình “hắc hóa” của nữ giang hồ Thanh Sói.\n	Thanh Sói hé lộ câu chuyện về cuộc đời của Thanh Sói, qua những góc khuất chưa từng kể trong quá khứ để lý giải vì sao cô lại trở nên hung ác đến như vậy. Bộ phim hứa hẹn sẽ tạo nên những khoảnh khắc ấn tượng của thể loại phim hành động Việt Nam, đồng thời đáp ứng kỳ vọng của những khán giả từng yêu thích Hai Phượng với những màn hành động mãn nhãn, hoành tráng.\n\nPhim mới Thanh Sói - Cúc Dại Trong Đêm sẽ ra mắt 30.12.2022 tại các rạp chiếu phim.','C18','active','2022-12-16 19:24:56','2022-12-17 10:53:17',1),(10,'Siêu Lừa Gặp Siêu Lầy','https://cdn.galaxycine.vn/media/2022/12/6/sieu-lua-gap-sieu-lay-3_1670319464932.jpg','https://www.youtube.com/watch?v=IvKRDG7qlgY',90,'2023-01-21 17:00:00','	Thuộc phong cách hành động – hài hước với các “cú lừa” thông minh và lầy lội đến từ bộ đôi Tú (Anh Tú) và Khoa (Mạc Văn Khoa), Siêu Lừa Gặp Siêu Lầy của đạo diễn Võ Thanh Hòa theo chân của Khoa – tên lừa đảo tầm cỡ “quốc nội” đến đảo ngọc Phú Quốc với mong muốn đổi đời.\n	Tại đây, Khoa gặp Tú – tay lừa đảo “hàng real” và cùng Tú thực hiện các phi vụ từ nhỏ đến lớn. Cứ ngỡ sự ranh mãnh của Tú và sự may mắn trời cho của Khoa sẽ giúp họ trở thành bộ đôi bất khả chiến bại, nào ngờ lại đối mặt với nhiều tình huống dở khóc – dở cười. Nhất là khi băng nhóm của bộ đôi nhanh chóng mở rộng vì sự góp mặt của ông Năm (Nhất Trung) và bé Mã Lai (Ngọc Phước). \n\nPhim mới Siêu Lừa Gặp Siêu Lầy khởi chiếu Mùng Tết 2023 tại các rạp chiếu phim toàn quốc.','C13','active','2022-12-16 19:27:49','2022-12-17 10:54:40',1),(11,'Shazam! Cơn thịnh nộ của các Vị Thần','https://cdn.galaxycine.vn/media/2022/7/29/mv5bzdiynjc3yzitmje5mi00ogvklwfmngytmgjlmwmyzmvkm2e5xkeyxkfqcgdeqxvyntq2mjm5mtg--v1-fmjpg-ux1000-_1659071773624.jpg','https://www.youtube.com/watch?v=J99A49ehlWo',128,'2023-06-01 17:00:00','	Trong lần trở lại này, cậu chàng Shazam vẫn trăn trở cho rằng mình “không xứng đáng với năng lực này”. Thế giới có The Flash nhanh như chớp với bộ suit đỏ đặc trưng, Aquaman to cao lực lưỡng và cả Batman siêu ngầu. Trong khi đó, Shazam vẫn chỉ là Shazam chẳng có năng lực gì khác biệt… hoặc là Billy Batson, một cậu nhóc trung học trong thân hình một siêu anh hùng cao to già đời, không thể kiểm soát sức mạnh của mình.\n	Nếu như các siêu anh hùng khác khiến khán giả không khỏi trầm trồ vì những năng lực siêu phàm có thể cứu thế giới thì “cậu nhóc” Shazam, mỗi khi dùng siêu năng lực vẫn hậu đậu như một “chú hề” lừng danh khiến người xem phải bật cười.\n\nPhim mới Shazam! Fury Of The Gods ra mắt tại các rạp chiếu phim từ 06.2023.','C13','active','2022-12-16 19:32:37','2022-12-17 10:55:28',2),(12,'Chiến Binh Báo Đen: Wakanda Bất diệt','https://cdn.galaxycine.vn/media/2022/11/10/300x450_1668066486371.jpg','https://www.youtube.com/watch?v=2Qcg6ZaSj8A',161,'2022-11-09 17:00:00','	Dường như Black Panther/ T’Challa đã qua đời trong một sự kiện nào đó. Shuri (Letitia Wright), Okoye (Danai Gurira) lẫn nữ hoàng Ramonda (Angela Bassett) đều đau đớn và không cầm được nước mắt. Sau sự ra đi của Chadwick Boseman, Kevin Feige quyết định không chọn diễn viên mới cho nhân vật này mà chọn một người khác kế tục danh hiệu Black Panther.\n	Có vẻ, cái chết của T’Challa đã dẫn đến cuộc chiến giữa Wakanda và Atlantis - một vương quốc sống dưới mặt nước do Namor (Tenoch Huerta) lãnh đạo. Trong truyện tranh, Namor là một nhân vật quan trọng khi góp mặt trong nhiều nhóm siêu anh hùng. Atlantis sở hữu nhiều công nghệ tiên tiến không kém cạnh Wakanda, đồng thời còn có khả năng liên kết và điều khiển các sinh vật biển.\n	Toàn bộ bộ lạc đều bị cuốn vào giao tranh. Vương quốc Wakanda hùng mạnh lần đầu tiên bị kẻ thù nhấn chìm trong biển nước. Ngay cả nội bộ nhóm Dora Milaje cũng xảy ra mâu thuẫn.\n	Ngoài ra, trailer còn giới thiệu Ironheart/Riri Williams (Dominique Thorne) xuất hiện bên cạnh Shuri. Trong nguyên tác truyện tranh, nữ nhân vật này là một thiên tài công nghệ khi tự chế ra bộ giáp riêng và được ví như truyền nhân của Iron Man. Cuối trailer, một Black Panther mới xuất hiện nhưng không rõ danh tính. Nhân vật này khả năng cao sẽ là người xuất hiện trong các phần phim sau này thay thế cho vị trí của T’Challa. Black Panther: Wakanda Forever chính là bước đệm để mang đến một kỷ nguyên mới cho MCU.\n\nPhim mới Black Panther: Wakanda Forever dự kiến ra mắt tại các rạp chiếu phim từ 11.2022.','C13','active','2022-12-17 09:48:25','2022-12-17 09:49:39',2),(13,'Black Adam','https://cdn.galaxycine.vn/media/2022/9/26/900wx1350h_1664177555434.jpg','https://www.youtube.com/watch?v=XBH5bmXOyUc',125,'2022-10-20 17:00:00','	Black Adam được các fan truyện tranh biết đến nhiều nhất trong vai trò kẻ thù - đối thủ lớn nhất của siêu anh hùng Shazam của vũ trụ truyện tranh và điện ảnh DC.\n	Theo nhiều phiên bản truyện, nếu như người được chọn hô to câu thần chú “Shazam!” sẽ lập tức nhận được sức mạnh của phù thủy cổ xưa, thì câu thần chú này sẽ giúp cho Black Adam có được sức mạnh của 6 vị thần Ai Cập cổ đại gồm: Shu (Thần Gió với sức mạnh bất khả chiến bại), Heru (Vị thần của bầu trời, chiến tranh và săn bắn với siêu tốc độ), Amon (Thần bảo hộ các Pharaoh ban cho thể lực dồi dào), Zehuti (Vị thần của trí tuệ vô song), Aton (cho Black Adam sức mạnh của sấm sét) and Mehen (Thần Rắn với sức mạnh của lòng can đảm).\n\nPhim mới Black Adam khởi chiếu 21.10.2022 tại các rạp chiếu phim toàn quốc.','C13','inactive','2022-12-17 09:54:33','2022-12-17 16:04:27',2),(14,'Alienoid: Cuộc Chiến Xuyên Không','https://cdn.galaxycine.vn/media/2022/7/21/1200wx1800h_1658390129496.jpg','https://www.youtube.com/watch?v=73Pe3IyxFNE',143,'2022-08-04 17:00:00','	Lấy bối cảnh thời hiện đại - năm 2022, phim kể về cuộc truy đuổi của người ngoài hành tinh Guard (Kim Woo-bin) với những tù nhân bị giam giữ trong cơ thể con người. Song song đó, vào thời Goryeo hơn 630 năm trước diễn ra cuộc tranh giành Gươm thần giữa pháp sư Muruk (Ryu Jun-yeol) và “cô gái bắn sấm sét” Ean (Kim Tae-ri) cùng hàng loạt nhân vật bí ẩn khác. Một cánh cổng thời gian mở ra kết nối hai thời đại, tạo ra một tình huống hỗn loạn chưa từng có.\n\nPhim mới Alienoid: Cuộc Chiến Xuyên Không ra mắt tại các rạp chiếu phim toàn quốc từ 05.08.2022.','C16','inactive','2022-12-17 10:01:15','2022-12-17 16:04:12',4),(15,'Chú Nguyền Tái Sinh','https://cdn.galaxycine.vn/media/2022/12/5/300x450_1670226257280.jpg','https://www.youtube.com/watch?v=io2IWEiCse4',95,'2022-12-08 17:00:00','	Nội dung phim xoay quanh việc một sinh viên vô tình nhặt được cái chai đầy bí ẩn bên thác nước khi đi dã ngoại cùng nhóm bạn và rồi chuyện gì đến cũng phải đến, anh vô tình vướn vào một chú nguyền cực kì kinh hoàng. Liệu ai sẽ tái sinh và ai sẽ trở thành quỷ dữ?\n\nPhim mới Chú Nguyền Tái Sinh, ra mắt tại các rạp chiếu phim từ 09.12.2022.','C18','active','2022-12-17 10:07:38','2022-12-17 10:10:21',6),(16,'Hung Thủ Vô Hình','https://cdn.galaxycine.vn/media/2022/12/2/300x450_1669972853898.jpg','https://www.youtube.com/watch?v=raYxJWa0hvU&amp;t=1s',105,'2022-12-08 17:00:00','	Một vụ án mạng trong phòng kín, không có dấu hiệu đột nhập cũng không có sự xuất hiện của người thứ ba. Khi nghi phạm duy nhất, Yoo Min Ho (So Ji-sub) thuê luật sư nổi tiếng Yang Sin Ae (Kim Yun-jin) bào chữa cho mình, anh buộc phải kể lại toàn bộ sự thật. Cuộc đối chất căng não giữa nghi phạm và luật sư lại làm lộ ra 1 câu chuyện được sắp đặt tài tình.\n\nPhim mới Hung Thủ Vô Hình, ra mắt tại các rạp chiếu phim từ 09.12.2022.','C16','active','2022-12-17 10:13:38','2022-12-17 10:13:38',4),(17,'Tro Tàn Rực Rỡ','https://cdn.galaxycine.vn/media/2022/11/21/300x450_1669022512155.jpg','https://www.youtube.com/watch?v=nAsKoWNgIWA',117,'2022-12-01 17:00:00','	Lấy bối cảnh xóm nghèo miền sông nước Thơm Rơm, “Tro Tàn Rực Rỡ” là câu chuyện tình khắc khoải của ba người phụ nữ dành cho những người đàn ông họ chọn gắn bó cả cuộc đời. Mỗi câu chuyện tình ấy mang những dáng vẻ khác nhau, nhưng tựu trung lại, đều mạnh mẽ và tôn vinh vẻ đẹp tâm hồn rất đỗi nhạy cảm của phái nữ.\n\nPhim mới Tro Tàn Rực Rỡ ra mắt tại các rạp chiếu phim từ 02.12.2022.','C16','active','2022-12-17 10:17:27','2022-12-17 10:17:27',1),(18,'Đêm Hung Tàn','https://cdn.galaxycine.vn/media/2022/11/14/1200wx1800h_1668416518582.jpg','https://www.youtube.com/watch?v=e1gwKLSRDCs',111,'2022-12-01 17:00:00','	Violent Night lấy bối cảnh một gia đình giàu có bị nhóm lính đánh thuê tấn công nhằm chiếm đoạt tài sản vào đêm Giáng Sinh. Thế nhưng những tên cướp không thể lường trước về cuộc đụng độ đẫm máu với một chiến binh đang cố gắng cứu lấy gia đình, và cứu lấy ngày lễ - ông già Noel.\n	Những kẻ xấu ngạo mạn kia cho rằng nhân vật thần thoại này không có thật và có thể “xử lý” ông một cách nhanh gọn. Thế nhưng, sau đó là liên tiếp những cảnh hành động “máu lửa” và rùng rợn và rồi khán giả sẽ càng “ố dề” với tài nghệ sử dụng vũ khí chuyên nghiệp như súng đạn đến những vật dụng thô sơ trong nhà kho của ông già Noel. Trẻ hư thì cần phạt và cái giá phải trả cho những kẻ khinh thường năng lực của ông già Noel thì không nhân đạo chút nào.\n	Đêm Hung Tàn không chỉ tràn ngập không khí lễ hội Giáng sinh, từ bối cảnh phim, trang phục đến âm nhạc, mà còn đậm chất hài đen, với những màn chế giễu, trào phúng, hài hước, khiến khán giả càng thêm phần thích thú và háo hức hơn.\n\nPhim mới Violent Night ra mắt tại các rạp chiếu phim từ 02.12.2022.','C18','active','2022-12-17 10:20:31','2022-12-17 10:20:31',2),(19,'NCT Dream The Movie: In a Dream','https://cdn.galaxycine.vn/media/2022/11/19/nct-dream-4_1668837270471.jpg','https://www.youtube.com/watch?v=_CrsMoHrvW8',117,'2022-11-29 17:00:00','	Bộ phim đầu tay với màn trình diễn bùng nổ của 7 thành viên NCT trong một buổi hòa nhạc solo thứ hai “ NCT DREAM TOUR THE DREAM SHOW2: In A DREAM tại Olympic Seoul - sân vận động lớn nhất Hàn Quộc và là sân khấu trong mơ của nhiều nghệ sĩ Hàn.\n	Đây là một sự kiện không thể bỏ qua với những cảnh hậu trường chưa được công bố, các đoạn phỏng vấn độc quyền phía sau sân khấu và định hướng của từng thành viên về tương lai.\n\nPhim mới NCT Dream The Movie: In a Dream ra mắt tại các rạp chiếu phim từ 30.11.2022.','P','inactive','2022-12-17 10:24:32','2022-12-17 16:05:21',4),(20,'Nhà Bà Nữ','https://cdn.galaxycine.vn/media/2022/12/7/300x450-nbn_1670396186584.jpg','https://www.youtube.com/watch?v=BS8aVvVTAh8',90,'2023-01-21 17:00:00','	Gia đình chữ “N” mỗi người một cá tính, một sở thích riêng nhưng tất cả đều phải chung tay vào công việc bận rộn của quán bánh canh cua nức tiếng của bà Nữ. Hình ảnh các thành viên gia đình bà Nữ đều rất gần gũi với hình mẫu người phụ nữ trong đời sống thường ngày: bản lĩnh, giỏi giang và thừa sức xoay trở với hằng hà sa số những thử thách trong cuộc sống.\n	Nhà Bà Nữ tái hiện chân thực cuộc sống thường nhật của một gia đình lao động điển hình, sống bằng nghề bán bánh canh cua.\n	Nhà Bà Nữ do Kim Entertainment sản xuất, Trấn Thành đạo diễn. Bộ phim hội tụ những tên tuổi diễn viên thân quen với khán giả Việt như: Trấn Thành, Lê Giang, NSND Ngọc Giàu, Khả Như, Huỳnh Uyển Ân, Song Luân, Lê Dương Bảo Lâm, NSND Việt Anh, NSƯT Công Ninh, Ngân Quỳnh, Lý Hạo Mạnh Quỳnh, Phương Lan… Nhà Bà Nữ dự kiến khởi chiếu 22.01.2023 (Mùng Một Tết Quý Mão).  \n\nPhim mới Nhà Bà Nữ, ra mắt tại các rạp chiếu phim từ 22.01.2023.','C13','active','2022-12-17 10:38:53','2022-12-17 10:40:35',1),(21,'One Piece Film Red','https://cdn.galaxycine.vn/media/2022/11/21/300x450_1668999463552.jpg','https://www.youtube.com/watch?v=L-aFL-bX1ao&amp;t=2s',115,'2022-11-24 17:00:00','	Bối cảnh của One Piece Film Red là một hòn đảo âm nhạc Elegia - nơi diva nổi tiếng bậc nhất thế giới tên Uta thực hiện buổi biểu diễn trực tiếp đầu tiên trước công chúng. Băng hải tặc Mũ Rơm và các fan khác của Uta từ nhiều thế lực khác nhau như hải tặc hay hải quân đều đã cùng tề tựu về buổi biểu diễn này. Biến cố bắt đầu ngay khi sự thật kinh hoàng được tiết lộ: Uta chính là con gái của Shanks tóc đỏ – một gương mặt của Tứ hoàng huyền thoại.\n\nPhim mới One Piece Film Red ra mắt tại các rạp chiếu phim từ 25.11.2022.','C13','inactive','2022-12-17 11:00:05','2022-12-17 16:04:37',3),(22,'Lyle, Chú Cá Sấu Biết Hát','https://cdn.galaxycine.vn/media/2022/11/1/1200x1800_1667275197172.jpg','https://www.youtube.com/watch?v=J14BfxOUxIs',104,'2022-11-03 17:00:00','	Khi gia đình Primm chuyển đến thành phố New York, cậu con trai nhỏ Josh gặp khó khăn trong việc thích nghi với ngôi trường và những người bạn mới. Mọi thứ thay đổi khi cậu bé phát hiện ra ra Lyle - một chàng cá sấu mê tắm rửa, trứng cá muối và âm nhạc sống trên gác mái của của mình. Hai người nhanh chóng trở thành bạn bè. Thế nhưng, khi cuộc sống của Lyle bị ông hàng xóm Grumps đe dọa, gia đình Primm buộc phải kết hợp với ông chủ cũ của Lyle là Hector P. Valenti (Javier Bardem) để cho cả thế giới thấy giá trị tình thân và sự kỳ diệu của một chàng cá sấu biết hát.\n\nPhim mới Lyle, Chú Cá Sấu Biết Hát ra mắt tại các rạp chiếu phim từ 04.11.2022.','P','active','2022-12-17 11:04:47','2022-12-17 11:04:47',2);
/*!40000 ALTER TABLE `film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film_actor`
--

DROP TABLE IF EXISTS `film_actor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film_actor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `film_id` int DEFAULT NULL,
  `actor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `film_actor_ActorId_FilmId_unique` (`film_id`,`actor_id`),
  KEY `actor_id` (`actor_id`),
  CONSTRAINT `film_actor_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `film_actor_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film_actor`
--

LOCK TABLES `film_actor` WRITE;
/*!40000 ALTER TABLE `film_actor` DISABLE KEYS */;
INSERT INTO `film_actor` VALUES (67,'2022-12-17 14:41:05','2022-12-17 14:41:05',1,1),(68,'2022-12-17 14:41:05','2022-12-17 14:41:05',1,2),(69,'2022-12-17 14:41:05','2022-12-17 14:41:05',1,3),(70,'2022-12-17 14:41:05','2022-12-17 14:41:05',1,4),(71,'2022-12-17 14:41:05','2022-12-17 14:41:05',1,5),(72,'2022-12-17 14:45:43','2022-12-17 14:45:43',11,6),(73,'2022-12-17 14:45:43','2022-12-17 14:45:43',11,7),(74,'2022-12-17 14:45:43','2022-12-17 14:45:43',11,8),(75,'2022-12-17 14:45:43','2022-12-17 14:45:43',11,9),(76,'2022-12-17 14:48:36','2022-12-17 14:48:36',2,10),(77,'2022-12-17 14:48:36','2022-12-17 14:48:36',2,11),(78,'2022-12-17 14:50:47','2022-12-17 14:50:47',3,12),(79,'2022-12-17 14:50:47','2022-12-17 14:50:47',3,13),(80,'2022-12-17 14:50:47','2022-12-17 14:50:47',3,14),(81,'2022-12-17 14:53:23','2022-12-17 14:53:23',4,15),(82,'2022-12-17 14:53:23','2022-12-17 14:53:23',4,16),(83,'2022-12-17 14:53:23','2022-12-17 14:53:23',4,17),(84,'2022-12-17 14:56:54','2022-12-17 14:56:54',5,18),(85,'2022-12-17 14:56:54','2022-12-17 14:56:54',5,19),(86,'2022-12-17 14:56:54','2022-12-17 14:56:54',5,20),(87,'2022-12-17 14:56:54','2022-12-17 14:56:54',5,21),(88,'2022-12-17 14:59:38','2022-12-17 14:59:38',6,22),(89,'2022-12-17 14:59:38','2022-12-17 14:59:38',6,23),(90,'2022-12-17 14:59:38','2022-12-17 14:59:38',6,24),(91,'2022-12-17 15:03:40','2022-12-17 15:03:40',7,25),(92,'2022-12-17 15:03:40','2022-12-17 15:03:40',7,26),(93,'2022-12-17 15:03:40','2022-12-17 15:03:40',7,27),(94,'2022-12-17 15:05:55','2022-12-17 15:05:55',8,28),(95,'2022-12-17 15:05:55','2022-12-17 15:05:55',8,29),(96,'2022-12-17 15:05:55','2022-12-17 15:05:55',8,30),(97,'2022-12-17 15:09:00','2022-12-17 15:09:00',9,31),(98,'2022-12-17 15:09:00','2022-12-17 15:09:00',9,32),(99,'2022-12-17 15:09:00','2022-12-17 15:09:00',9,33),(100,'2022-12-17 15:09:00','2022-12-17 15:09:00',9,34),(101,'2022-12-17 15:11:05','2022-12-17 15:11:05',10,35),(102,'2022-12-17 15:11:05','2022-12-17 15:11:05',10,36),(103,'2022-12-17 15:20:32','2022-12-17 15:20:32',12,37),(104,'2022-12-17 15:20:32','2022-12-17 15:20:32',12,38),(105,'2022-12-17 15:20:32','2022-12-17 15:20:32',12,39),(106,'2022-12-17 15:20:32','2022-12-17 15:20:32',12,40),(107,'2022-12-17 15:26:46','2022-12-17 15:26:46',13,41),(108,'2022-12-17 15:26:46','2022-12-17 15:26:46',13,42),(109,'2022-12-17 15:26:46','2022-12-17 15:26:46',13,43),(110,'2022-12-17 15:34:58','2022-12-17 15:34:58',14,44),(111,'2022-12-17 15:34:58','2022-12-17 15:34:58',14,45),(112,'2022-12-17 15:38:27','2022-12-17 15:38:27',15,46),(113,'2022-12-17 15:38:27','2022-12-17 15:38:27',15,47),(114,'2022-12-17 15:38:27','2022-12-17 15:38:27',15,48),(115,'2022-12-17 15:41:28','2022-12-17 15:41:28',16,49),(116,'2022-12-17 15:41:28','2022-12-17 15:41:28',16,50),(117,'2022-12-17 15:41:28','2022-12-17 15:41:28',16,51),(118,'2022-12-17 15:44:22','2022-12-17 15:44:22',17,52),(119,'2022-12-17 15:44:22','2022-12-17 15:44:22',17,53),(120,'2022-12-17 15:49:23','2022-12-17 15:49:23',18,54),(121,'2022-12-17 15:49:23','2022-12-17 15:49:23',18,55),(122,'2022-12-17 15:49:23','2022-12-17 15:49:23',18,56),(123,'2022-12-17 15:51:45','2022-12-17 15:51:45',19,57),(124,'2022-12-17 15:55:36','2022-12-17 15:55:36',20,58),(125,'2022-12-17 15:55:36','2022-12-17 15:55:36',20,59),(126,'2022-12-17 15:55:36','2022-12-17 15:55:36',20,60),(127,'2022-12-17 15:55:36','2022-12-17 15:55:36',20,61),(128,'2022-12-17 15:58:02','2022-12-17 15:58:02',21,62),(129,'2022-12-17 15:58:02','2022-12-17 15:58:02',21,63),(130,'2022-12-17 15:58:02','2022-12-17 15:58:02',21,64),(131,'2022-12-17 16:02:28','2022-12-17 16:02:28',22,65),(132,'2022-12-17 16:02:28','2022-12-17 16:02:28',22,66),(133,'2022-12-17 16:02:28','2022-12-17 16:02:28',22,67);
/*!40000 ALTER TABLE `film_actor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film_category`
--

DROP TABLE IF EXISTS `film_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `film_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `film_category_CategoryId_FilmId_unique` (`film_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `film_category_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `film_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film_category`
--

LOCK TABLES `film_category` WRITE;
/*!40000 ALTER TABLE `film_category` DISABLE KEYS */;
INSERT INTO `film_category` VALUES (1,'2022-12-16 18:46:52','2022-12-16 18:46:52',1,NULL),(2,'2022-12-16 18:56:41','2022-12-16 18:56:41',2,NULL),(3,'2022-12-16 18:59:43','2022-12-16 18:59:43',3,NULL),(4,'2022-12-16 19:02:18','2022-12-16 19:02:18',4,NULL),(5,'2022-12-16 19:05:19','2022-12-16 19:05:19',5,NULL),(6,'2022-12-16 19:11:36','2022-12-16 19:11:36',6,NULL),(7,'2022-12-16 19:13:08','2022-12-16 19:13:08',6,NULL),(8,'2022-12-16 19:17:01','2022-12-16 19:17:01',7,NULL),(9,'2022-12-16 19:19:06','2022-12-16 19:19:06',6,NULL),(10,'2022-12-16 19:22:28','2022-12-16 19:22:28',8,NULL),(11,'2022-12-16 19:24:56','2022-12-16 19:24:56',9,NULL),(12,'2022-12-16 19:27:49','2022-12-16 19:27:49',10,NULL),(13,'2022-12-16 19:32:37','2022-12-16 19:32:37',11,NULL),(18,'2022-12-16 19:42:06','2022-12-16 19:42:06',3,4),(21,'2022-12-16 19:42:39','2022-12-16 19:42:39',4,4),(22,'2022-12-16 19:43:05','2022-12-16 19:43:05',5,1),(23,'2022-12-16 19:43:05','2022-12-16 19:43:05',5,6),(24,'2022-12-16 19:43:58','2022-12-16 19:43:58',6,7),(25,'2022-12-16 19:45:23','2022-12-16 19:45:23',7,7),(26,'2022-12-16 19:45:23','2022-12-16 19:45:23',7,2),(29,'2022-12-16 19:47:35','2022-12-16 19:47:35',9,1),(30,'2022-12-16 19:48:36','2022-12-16 19:48:36',10,8),(31,'2022-12-16 19:49:29','2022-12-16 19:49:29',11,1),(32,'2022-12-17 09:48:25','2022-12-17 09:48:25',12,1),(33,'2022-12-17 09:54:33','2022-12-17 09:54:33',13,1),(36,'2022-12-17 10:01:54','2022-12-17 10:01:54',14,NULL),(37,'2022-12-17 10:03:15','2022-12-17 10:03:15',14,1),(38,'2022-12-17 10:03:15','2022-12-17 10:03:15',14,3),(40,'2022-12-17 10:08:34','2022-12-17 10:08:34',15,NULL),(41,'2022-12-17 10:10:21','2022-12-17 10:10:21',15,4),(42,'2022-12-17 10:13:38','2022-12-17 10:13:38',16,10),(43,'2022-12-17 10:13:38','2022-12-17 10:13:38',16,6),(44,'2022-12-17 10:13:38','2022-12-17 10:13:38',16,3),(45,'2022-12-17 10:17:27','2022-12-17 10:17:27',17,5),(46,'2022-12-17 10:17:27','2022-12-17 10:17:27',17,11),(47,'2022-12-17 10:20:31','2022-12-17 10:20:31',18,1),(48,'2022-12-17 10:20:31','2022-12-17 10:20:31',18,8),(49,'2022-12-17 10:20:31','2022-12-17 10:20:31',18,10),(50,'2022-12-17 10:24:32','2022-12-17 10:24:32',19,12),(51,'2022-12-17 10:38:53','2022-12-17 10:38:53',20,8),(52,'2022-12-17 10:38:53','2022-12-17 10:38:53',20,13),(56,'2022-12-17 10:43:08','2022-12-17 10:43:08',2,NULL),(57,'2022-12-17 10:43:21','2022-12-17 10:43:21',1,NULL),(58,'2022-12-17 10:44:12','2022-12-17 10:44:12',1,1),(59,'2022-12-17 10:44:12','2022-12-17 10:44:12',1,2),(60,'2022-12-17 10:44:12','2022-12-17 10:44:12',1,3),(61,'2022-12-17 10:45:27','2022-12-17 10:45:27',2,4),(62,'2022-12-17 10:48:48','2022-12-17 10:48:48',3,5),(63,'2022-12-17 10:48:48','2022-12-17 10:48:48',3,6),(65,'2022-12-17 10:53:44','2022-12-17 10:53:44',8,8),(66,'2022-12-17 10:53:44','2022-12-17 10:53:44',8,9),(67,'2022-12-17 11:00:05','2022-12-17 11:00:05',21,7),(68,'2022-12-17 11:04:47','2022-12-17 11:04:47',22,2),(69,'2022-12-17 11:04:47','2022-12-17 11:04:47',22,8);
/*!40000 ALTER TABLE `film_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film_director`
--

DROP TABLE IF EXISTS `film_director`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film_director` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `film_id` int DEFAULT NULL,
  `director_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `film_director_DirectorId_FilmId_unique` (`film_id`,`director_id`),
  KEY `director_id` (`director_id`),
  CONSTRAINT `film_director_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `film_director_ibfk_2` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film_director`
--

LOCK TABLES `film_director` WRITE;
/*!40000 ALTER TABLE `film_director` DISABLE KEYS */;
INSERT INTO `film_director` VALUES (62,'2022-12-17 14:06:04','2022-12-17 14:06:04',1,1),(63,'2022-12-17 14:11:21','2022-12-17 14:11:21',2,2),(64,'2022-12-17 14:16:52','2022-12-17 14:16:52',3,3),(65,'2022-12-17 14:18:54','2022-12-17 14:18:54',4,4),(66,'2022-12-17 14:20:51','2022-12-17 14:20:51',5,5),(67,'2022-12-17 14:22:15','2022-12-17 14:22:15',6,6),(68,'2022-12-17 14:23:35','2022-12-17 14:23:35',7,7),(69,'2022-12-17 14:25:41','2022-12-17 14:25:41',8,8),(70,'2022-12-17 14:27:02','2022-12-17 14:27:02',9,9),(71,'2022-12-17 14:28:27','2022-12-17 14:28:27',10,10),(72,'2022-12-17 14:30:59','2022-12-17 14:30:59',11,11),(73,'2022-12-17 15:20:32','2022-12-17 15:20:32',12,12),(74,'2022-12-17 15:26:46','2022-12-17 15:26:46',13,13),(75,'2022-12-17 15:34:58','2022-12-17 15:34:58',14,14),(76,'2022-12-17 15:38:27','2022-12-17 15:38:27',15,15),(77,'2022-12-17 15:41:28','2022-12-17 15:41:28',16,16),(78,'2022-12-17 15:44:22','2022-12-17 15:44:22',17,17),(79,'2022-12-17 15:49:23','2022-12-17 15:49:23',18,18),(80,'2022-12-17 15:51:45','2022-12-17 15:51:45',19,19),(81,'2022-12-17 15:55:36','2022-12-17 15:55:36',20,20),(82,'2022-12-17 15:58:02','2022-12-17 15:58:02',21,21),(83,'2022-12-17 16:02:28','2022-12-17 16:02:28',22,22),(84,'2022-12-17 16:02:28','2022-12-17 16:02:28',22,23);
/*!40000 ALTER TABLE `film_director` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nationality`
--

DROP TABLE IF EXISTS `nationality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nationality` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nationality`
--

LOCK TABLES `nationality` WRITE;
/*!40000 ALTER TABLE `nationality` DISABLE KEYS */;
INSERT INTO `nationality` VALUES (1,'Việt Nam','https://cdn.countryflags.com/thumbs/vietnam/flag-square-500.png','2022-12-15 20:11:55','2022-12-15 20:11:55'),(2,'Mỹ','https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-500.png','2022-12-15 20:12:35','2022-12-15 20:12:35'),(3,'Nhật Bản','https://cdn.countryflags.com/thumbs/japan/flag-square-500.png','2022-12-15 20:14:01','2022-12-15 20:14:01'),(4,'Hàn Quốc','https://cdn.countryflags.com/thumbs/south-korea/flag-square-500.png','2022-12-15 20:14:22','2022-12-15 20:14:22'),(5,'Thái Lan','https://cdn.countryflags.com/thumbs/thailand/flag-square-500.png','2022-12-15 20:16:39','2022-12-15 20:16:39'),(6,'Malaysia','https://cdn.countryflags.com/thumbs/malaysia/flag-square-500.png','2022-12-15 20:17:54','2022-12-15 20:17:54'),(7,'Indonesia','https://cdn.countryflags.com/thumbs/indonesia/flag-square-500.png','2022-12-15 20:18:34','2022-12-15 20:18:34'),(8,'Nga','https://cdn.countryflags.com/thumbs/russia/flag-square-500.png','2022-12-16 19:11:14','2022-12-16 19:11:14'),(9,'Canada','https://cdn.countryflags.com/thumbs/canada/flag-square-500.png','2022-12-17 14:00:39','2022-12-17 14:00:39'),(10,'Thụy Điển','https://cdn.countryflags.com/thumbs/sweden/flag-square-500.png','2022-12-17 14:30:49','2022-12-17 16:10:22'),(11,'Anh','https://cdn.countryflags.com/thumbs/england/flag-square-500.png','2022-12-17 14:34:57','2022-12-17 14:34:57'),(12,'Tây Ban Nha','https://cdn.countryflags.com/thumbs/spain/flag-square-500.png','2022-12-17 15:01:12','2022-12-17 15:01:12'),(13,'Mexico','https://cdn.countryflags.com/thumbs/mexico/flag-square-500.png','2022-12-17 15:01:38','2022-12-17 15:01:38'),(14,'Na Uy','https://cdn.countryflags.com/thumbs/norway/flag-square-500.png','2022-12-17 15:46:18','2022-12-17 15:46:18'),(15,'Colombia','https://cdn.countryflags.com/thumbs/colombia/flag-square-500.png','2022-12-17 15:48:17','2022-12-17 15:48:17');
/*!40000 ALTER TABLE `nationality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vision_type` varchar(255) NOT NULL,
  `day_code` tinyint NOT NULL,
  `value` bigint DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price`
--

LOCK TABLES `price` WRITE;
/*!40000 ALTER TABLE `price` DISABLE KEYS */;
INSERT INTO `price` VALUES (1,'2D',1,60000,NULL),(2,'2D',2,60000,NULL),(3,'2D',3,60000,NULL),(4,'2D',4,60000,NULL),(5,'2D',5,60000,NULL),(6,'2D',6,80000,NULL),(7,'2D',0,80000,NULL),(8,'3D',1,90000,NULL),(9,'3D',2,90000,NULL),(10,'3D',3,90000,NULL),(11,'3D',4,90000,NULL),(12,'3D',5,90000,NULL),(13,'3D',6,110000,NULL),(14,'3D',0,110000,NULL);
/*!40000 ALTER TABLE `price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin','2022-12-16 16:52:14','2022-12-16 16:52:14'),(2,'Customer','2022-12-16 16:52:14','2022-12-16 16:52:14');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `vision_type` varchar(255) DEFAULT NULL,
  `col_number` int DEFAULT NULL,
  `row_number` int DEFAULT NULL,
  `col_empty` varchar(255) DEFAULT '0',
  `row_empty` varchar(255) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Room 1','2D',10,10,'5','5','2022-12-17 16:51:27','2022-12-17 17:02:55'),(2,'Room 2','2D',12,12,'6','6','2022-12-17 16:51:46','2022-12-17 17:03:17'),(3,'Room 3','3D',10,10,'3','5','2022-12-17 16:52:08','2022-12-17 17:05:35'),(4,'Room 4','3D',12,12,'5','5','2022-12-17 16:52:17','2022-12-17 17:05:10'),(5,'Room 5','3D',14,14,'7','7','2022-12-18 11:09:27','2022-12-18 11:09:27');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `row` int NOT NULL,
  `column` int NOT NULL,
  `code` varchar(255) NOT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `showtime_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `seat_showtime_id_row_column` (`showtime_id`,`row`,`column`),
  CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`showtime_id`) REFERENCES `showtime` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showtime`
--

DROP TABLE IF EXISTS `showtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showtime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_time` datetime NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `film_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `film_id` (`film_id`),
  CONSTRAINT `showtime_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `showtime_ibfk_2` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showtime`
--

LOCK TABLES `showtime` WRITE;
/*!40000 ALTER TABLE `showtime` DISABLE KEYS */;
INSERT INTO `showtime` VALUES (1,'2022-12-19 11:00:00','2022-12-17 16:56:57','2022-12-17 16:56:57',1,1),(2,'2022-12-19 12:00:00','2022-12-17 16:58:18','2022-12-17 16:58:18',3,1),(3,'2022-12-19 13:00:00','2022-12-17 17:06:19','2022-12-17 17:06:19',5,1),(4,'2022-12-19 12:30:00','2022-12-17 17:07:03','2022-12-17 17:07:03',2,1),(5,'2022-12-19 10:45:00','2022-12-18 11:06:05','2022-12-18 11:06:05',4,4),(6,'2022-12-19 13:15:00','2022-12-18 11:11:36','2022-12-18 11:11:36',4,5),(7,'2022-12-19 16:30:00','2022-12-18 11:11:56','2022-12-18 11:11:56',4,1),(8,'2022-12-19 16:15:00','2022-12-18 11:15:56','2022-12-18 11:15:56',2,4),(9,'2022-12-19 15:00:00','2022-12-18 11:17:05','2022-12-18 11:17:05',1,16),(10,'2022-12-19 08:45:00','2022-12-18 11:17:42','2022-12-18 11:17:42',1,15),(11,'2022-12-19 09:00:00','2022-12-18 11:19:13','2022-12-18 11:19:13',2,5),(12,'2022-12-19 15:45:00','2022-12-18 11:20:41','2022-12-18 11:20:41',3,4),(13,'2022-12-19 08:30:00','2022-12-18 11:21:35','2022-12-18 11:21:35',4,16),(14,'2022-12-19 09:45:00','2022-12-18 13:23:22','2022-12-18 13:23:22',3,15),(15,'2022-12-19 10:30:00','2022-12-18 13:25:24','2022-12-18 13:25:24',5,5),(16,'2022-12-19 02:00:00','2022-12-18 13:28:56','2022-12-18 13:28:56',3,17),(17,'2022-12-19 06:30:00','2022-12-18 13:29:35','2022-12-18 13:29:35',2,4),(18,'2022-12-19 04:00:00','2022-12-18 13:32:29','2022-12-18 13:32:29',5,15),(19,'2022-12-19 03:00:00','2022-12-18 13:33:25','2022-12-18 13:33:25',4,16),(20,'2022-12-19 05:00:00','2022-12-18 13:33:58','2022-12-18 13:33:58',3,18),(21,'2022-12-19 06:05:00','2022-12-18 13:35:40','2022-12-18 13:35:40',4,3),(22,'2022-12-19 07:05:00','2022-12-18 13:36:51','2022-12-18 13:36:51',5,12),(23,'2022-12-19 02:10:00','2022-12-18 13:37:04','2022-12-18 13:37:04',1,12),(24,'2022-12-19 02:30:00','2022-12-18 13:38:01','2022-12-18 13:38:01',2,22),(25,'2022-12-19 05:30:00','2022-12-18 13:43:20','2022-12-18 13:43:20',1,5),(26,'2022-12-20 11:45:00','2022-12-18 13:45:15','2022-12-18 13:45:15',5,1),(27,'2022-12-20 13:05:00','2022-12-18 13:46:19','2022-12-18 13:46:19',4,1),(28,'2022-12-20 16:15:00','2022-12-18 13:46:58','2022-12-18 13:46:58',3,1),(29,'2022-12-20 15:30:00','2022-12-18 13:47:37','2022-12-18 13:47:37',1,1),(30,'2022-12-20 12:35:00','2022-12-18 13:48:34','2022-12-18 13:48:34',2,1),(31,'2022-12-20 02:00:00','2022-12-18 13:49:05','2022-12-18 13:49:05',4,1),(32,'2022-12-20 16:30:00','2022-12-18 13:51:35','2022-12-18 13:51:35',2,4),(33,'2022-12-20 16:55:00','2022-12-18 13:52:50','2022-12-18 13:52:50',4,5),(34,'2022-12-20 13:00:00','2022-12-18 13:53:48','2022-12-18 13:53:48',3,4),(35,'2022-12-20 11:00:00','2022-12-18 13:54:26','2022-12-18 13:54:26',4,4),(36,'2022-12-20 09:05:00','2022-12-18 13:55:00','2022-12-18 13:55:00',5,5),(37,'2022-12-20 12:30:00','2022-12-18 14:08:00','2022-12-18 14:08:00',1,5),(38,'2022-12-20 10:00:00','2022-12-18 14:09:10','2022-12-18 14:09:10',2,15),(39,'2022-12-20 10:05:00','2022-12-18 14:10:34','2022-12-18 14:10:34',1,16),(40,'2022-12-20 09:30:00','2022-12-18 14:12:48','2022-12-18 14:12:48',3,15),(41,'2022-12-20 05:45:00','2022-12-18 14:15:11','2022-12-18 14:15:11',5,12),(42,'2022-12-20 07:10:00','2022-12-18 14:24:04','2022-12-18 14:24:04',4,15),(43,'2022-12-20 02:05:00','2022-12-18 14:24:52','2022-12-18 14:24:52',3,16),(44,'2022-12-20 04:35:00','2022-12-18 14:25:09','2022-12-18 14:25:09',3,17),(45,'2022-12-20 07:05:00','2022-12-18 14:25:49','2022-12-18 14:25:49',3,18),(46,'2022-12-20 02:55:00','2022-12-18 14:26:51','2022-12-18 14:26:51',1,3),(47,'2022-12-20 02:30:00','2022-12-18 14:27:14','2022-12-18 14:27:14',5,22),(48,'2022-12-21 02:35:00','2022-12-18 14:31:29','2022-12-18 14:31:29',5,5),(49,'2022-12-21 05:35:00','2022-12-18 14:31:36','2022-12-18 14:31:36',5,4),(50,'2022-12-21 08:35:00','2022-12-18 14:31:55','2022-12-18 14:31:55',5,12),(51,'2022-12-21 11:55:00','2022-12-18 14:32:06','2022-12-18 14:32:06',5,1),(52,'2022-12-21 15:45:00','2022-12-18 14:32:38','2022-12-18 14:32:38',5,15),(53,'2022-12-21 12:55:00','2022-12-18 14:33:55','2022-12-18 14:33:55',4,1),(54,'2022-12-21 09:30:00','2022-12-18 14:35:39','2022-12-18 14:35:39',4,16),(55,'2022-12-21 06:55:00','2022-12-18 14:35:52','2022-12-18 14:35:52',4,17),(56,'2022-12-21 04:15:00','2022-12-18 14:36:06','2022-12-18 14:36:06',4,18),(57,'2022-12-21 02:00:00','2022-12-18 14:36:26','2022-12-18 14:36:26',4,22),(58,'2022-12-21 02:20:00','2022-12-18 14:37:15','2022-12-18 14:37:15',3,17),(59,'2022-12-21 05:00:00','2022-12-18 14:38:41','2022-12-18 14:38:41',3,15),(60,'2022-12-21 08:00:00','2022-12-18 14:39:01','2022-12-18 14:39:01',3,5),(61,'2022-12-21 11:00:00','2022-12-18 14:39:17','2022-12-18 14:39:17',3,4),(62,'2022-12-21 16:00:00','2022-12-18 14:40:01','2022-12-18 14:40:01',3,16),(63,'2022-12-21 12:30:00','2022-12-18 14:41:19','2022-12-18 14:41:19',2,1),(64,'2022-12-21 09:30:00','2022-12-18 14:41:43','2022-12-18 14:41:43',2,4),(65,'2022-12-21 06:30:00','2022-12-18 14:41:50','2022-12-18 14:41:50',2,5),(66,'2022-12-21 02:30:00','2022-12-18 14:42:34','2022-12-18 14:42:34',2,12),(67,'2022-12-21 05:15:00','2022-12-18 14:45:00','2022-12-18 14:45:00',1,3),(68,'2022-12-21 02:45:00','2022-12-18 14:46:06','2022-12-18 14:46:06',1,22),(69,'2022-12-21 08:30:00','2022-12-18 14:47:52','2022-12-18 14:47:52',1,18),(70,'2022-12-21 11:00:00','2022-12-18 14:48:20','2022-12-18 14:48:20',1,1);
/*!40000 ALTER TABLE `showtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room` varchar(255) NOT NULL,
  `seat_row` int NOT NULL,
  `seat_column` int NOT NULL,
  `seat_code` varchar(255) NOT NULL,
  `time` datetime NOT NULL,
  `price` bigint NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `film_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `film_id` (`film_id`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'phongbeen@gmail.com','$2b$10$vdvPHx67OT1nTn1zUxf.RuLGCET6XrJ/P.P7QUtGxbC6q2rE9pqGS','Quang Phong',NULL,'2002-11-21','2022-12-16 18:37:41','2022-12-17 16:20:41');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_code`
--

DROP TABLE IF EXISTS `user_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_code` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `expires` datetime NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_code`
--

LOCK TABLES `user_code` WRITE;
/*!40000 ALTER TABLE `user_code` DISABLE KEYS */;
INSERT INTO `user_code` VALUES (1,'phongbeen@gmail.com','116622','2022-12-16 19:06:43','2022-12-16 18:36:43','2022-12-16 18:36:43');
/*!40000 ALTER TABLE `user_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_role_RoleId_UserId_unique` (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'2022-12-16 18:37:41','2022-12-16 18:37:41',1,1);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-18 23:01:26