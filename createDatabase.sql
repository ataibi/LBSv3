-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.17 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for lebotsur
DROP DATABASE IF EXISTS `lebotsur`;
CREATE DATABASE IF NOT EXISTS `lebotsur` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lebotsur`;

-- Dumping structure for table lebotsur.experiencetolevel
DROP TABLE IF EXISTS `experiencetolevel`;
CREATE TABLE IF NOT EXISTS `experiencetolevel` (
  `level` int(11) NOT NULL,
  `experience` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table lebotsur.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userID` varchar(20) NOT NULL,
  `guild` varchar(30) NOT NULL,
  `money` decimal(10,2) DEFAULT '0.00',
  `experience` int(11) DEFAULT '0',
  `experienceCap` int(11) NOT NULL DEFAULT '1800',
  `level` int(11) NOT NULL DEFAULT '1',
  `lastMoney` varchar(50) NOT NULL DEFAULT '0',
  `lastExperience` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`,`guild`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
