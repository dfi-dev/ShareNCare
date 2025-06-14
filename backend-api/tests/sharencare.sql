-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: sharencare
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `candidate_application_comments`
--

DROP TABLE IF EXISTS `candidate_application_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate_application_comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `candidate_application_id` bigint unsigned NOT NULL,
  `commented_by` bigint unsigned NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_application_comments_candidate_application_id_foreign` (`candidate_application_id`),
  KEY `candidate_application_comments_commented_by_foreign` (`commented_by`),
  CONSTRAINT `candidate_application_comments_candidate_application_id_foreign` FOREIGN KEY (`candidate_application_id`) REFERENCES `candidate_applications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidate_application_comments_commented_by_foreign` FOREIGN KEY (`commented_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_application_comments`
--

LOCK TABLES `candidate_application_comments` WRITE;
/*!40000 ALTER TABLE `candidate_application_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidate_application_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_application_communications`
--

DROP TABLE IF EXISTS `candidate_application_communications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate_application_communications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `candidate_application_id` bigint unsigned NOT NULL,
  `sent_by` bigint unsigned NOT NULL,
  `type` enum('email','sms') COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `c_app_comm_cand_app_id_fk` (`candidate_application_id`),
  KEY `candidate_application_communications_sent_by_foreign` (`sent_by`),
  CONSTRAINT `c_app_comm_cand_app_id_fk` FOREIGN KEY (`candidate_application_id`) REFERENCES `candidate_applications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidate_application_communications_sent_by_foreign` FOREIGN KEY (`sent_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_application_communications`
--

LOCK TABLES `candidate_application_communications` WRITE;
/*!40000 ALTER TABLE `candidate_application_communications` DISABLE KEYS */;
INSERT INTO `candidate_application_communications` VALUES (1,18,5,'email','Next Interview Round','Dear candidate, your next interview round is scheduled for Monday at 10 AM.','2025-05-18 02:37:10','2025-05-17 21:07:10','2025-05-17 21:07:10'),(2,18,5,'email','Next Interview Round','Dear candidate, your next interview round is scheduled for Monday at 10 AM.','2025-05-18 02:42:02','2025-05-17 21:12:02','2025-05-17 21:12:02'),(11,18,5,'email','Test Emaiol','hello','2025-05-25 06:42:25','2025-05-25 01:12:25','2025-05-25 01:12:25'),(12,18,5,'email','cdedw','dw','2025-06-10 16:04:10','2025-06-10 10:34:10','2025-06-10 10:34:10');
/*!40000 ALTER TABLE `candidate_application_communications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_application_logs`
--

DROP TABLE IF EXISTS `candidate_application_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate_application_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `candidate_application_id` bigint unsigned NOT NULL,
  `from_stage` tinyint unsigned DEFAULT NULL,
  `to_stage` tinyint unsigned NOT NULL,
  `changed_by` bigint unsigned NOT NULL,
  `changed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_application_logs_candidate_application_id_foreign` (`candidate_application_id`),
  KEY `candidate_application_logs_changed_by_foreign` (`changed_by`),
  CONSTRAINT `candidate_application_logs_candidate_application_id_foreign` FOREIGN KEY (`candidate_application_id`) REFERENCES `candidate_applications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidate_application_logs_changed_by_foreign` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_application_logs`
--

LOCK TABLES `candidate_application_logs` WRITE;
/*!40000 ALTER TABLE `candidate_application_logs` DISABLE KEYS */;
INSERT INTO `candidate_application_logs` VALUES (9,18,5,1,5,'2025-05-24 16:23:18',NULL,'2025-05-24 16:23:18','2025-05-24 16:23:18'),(10,18,1,2,5,'2025-05-24 22:53:58',NULL,'2025-05-24 22:53:58','2025-05-24 22:53:58'),(11,18,2,3,5,'2025-05-24 22:54:00',NULL,'2025-05-24 22:54:00','2025-05-24 22:54:00'),(12,18,3,4,5,'2025-05-24 22:54:01',NULL,'2025-05-24 22:54:01','2025-05-24 22:54:01'),(13,18,4,1,5,'2025-05-24 22:54:05',NULL,'2025-05-24 22:54:05','2025-05-24 22:54:05'),(14,18,1,2,5,'2025-05-24 22:54:08',NULL,'2025-05-24 22:54:08','2025-05-24 22:54:08'),(15,18,2,3,5,'2025-05-24 22:54:37',NULL,'2025-05-24 22:54:37','2025-05-24 22:54:37'),(16,18,3,1,5,'2025-05-25 01:08:48',NULL,'2025-05-25 01:08:48','2025-05-25 01:08:48'),(17,18,1,2,5,'2025-05-25 01:09:59',NULL,'2025-05-25 01:09:59','2025-05-25 01:09:59'),(18,18,2,3,5,'2025-05-25 01:11:39',NULL,'2025-05-25 01:11:39','2025-05-25 01:11:39'),(19,18,3,4,5,'2025-05-25 01:11:41',NULL,'2025-05-25 01:11:41','2025-05-25 01:11:41'),(20,18,4,6,5,'2025-05-25 01:11:51',NULL,'2025-05-25 01:11:51','2025-05-25 01:11:51'),(21,18,6,3,5,'2025-05-25 06:27:24',NULL,'2025-05-25 06:27:24','2025-05-25 06:27:24'),(22,18,3,4,5,'2025-05-25 14:07:54',NULL,'2025-05-25 14:07:54','2025-05-25 14:07:54'),(23,18,4,2,5,'2025-06-07 05:54:22',NULL,'2025-06-07 05:54:22','2025-06-07 05:54:22'),(24,18,2,3,5,'2025-06-07 05:54:32',NULL,'2025-06-07 05:54:32','2025-06-07 05:54:32');
/*!40000 ALTER TABLE `candidate_application_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_application_reviews`
--

DROP TABLE IF EXISTS `candidate_application_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate_application_reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `candidate_application_id` bigint unsigned NOT NULL,
  `reviewed_by` bigint unsigned NOT NULL,
  `rating` tinyint unsigned DEFAULT NULL,
  `feedback` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_application_reviews_candidate_application_id_foreign` (`candidate_application_id`),
  KEY `candidate_application_reviews_reviewed_by_foreign` (`reviewed_by`),
  CONSTRAINT `candidate_application_reviews_candidate_application_id_foreign` FOREIGN KEY (`candidate_application_id`) REFERENCES `candidate_applications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidate_application_reviews_reviewed_by_foreign` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_application_reviews`
--

LOCK TABLES `candidate_application_reviews` WRITE;
/*!40000 ALTER TABLE `candidate_application_reviews` DISABLE KEYS */;
INSERT INTO `candidate_application_reviews` VALUES (6,18,3,1,'The candidate demonstrated strong communication skills and relevant experience.','2025-05-24 05:54:03','2025-05-24 05:54:03'),(12,18,5,5,'ghhggh','2025-05-24 22:55:03','2025-05-24 22:55:03'),(13,18,5,5,'hi','2025-06-06 09:05:16','2025-06-06 09:05:16'),(14,18,5,5,'bdgb','2025-06-10 10:33:59','2025-06-10 10:33:59');
/*!40000 ALTER TABLE `candidate_application_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_applications`
--

DROP TABLE IF EXISTS `candidate_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate_applications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `candidate_id` bigint unsigned NOT NULL,
  `job_post_id` bigint unsigned NOT NULL,
  `applied_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `stage_id` tinyint unsigned NOT NULL DEFAULT '1',
  `status` enum('Active','Rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`id`),
  KEY `candidate_applications_candidate_id_foreign` (`candidate_id`),
  KEY `candidate_applications_job_post_id_foreign` (`job_post_id`),
  CONSTRAINT `candidate_applications_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidate_applications_job_post_id_foreign` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_applications`
--

LOCK TABLES `candidate_applications` WRITE;
/*!40000 ALTER TABLE `candidate_applications` DISABLE KEYS */;
INSERT INTO `candidate_applications` VALUES (18,22,1,'2025-05-11 14:26:45','2025-05-11 08:56:45','2025-06-07 05:54:32',3,'Active'),(26,32,1,'2025-05-30 17:39:23','2025-05-30 12:09:23','2025-05-30 12:09:23',1,'Active'),(27,33,1,'2025-05-30 17:40:11','2025-05-30 12:10:11','2025-05-30 12:10:11',1,'Active'),(28,34,1,'2025-05-30 17:40:22','2025-05-30 12:10:22','2025-05-30 12:10:22',1,'Active'),(29,35,1,'2025-05-30 17:40:46','2025-05-30 12:10:46','2025-05-30 12:10:46',2,'Active'),(30,36,1,'2025-05-30 17:40:53','2025-05-30 12:10:53','2025-05-30 12:10:53',1,'Active'),(31,37,1,'2025-05-30 17:41:01','2025-05-30 12:11:01','2025-05-30 12:11:01',1,'Active'),(32,38,1,'2025-05-30 17:41:08','2025-05-30 12:11:08','2025-05-30 12:11:08',1,'Active'),(33,39,1,'2025-05-30 17:41:14','2025-05-30 12:11:14','2025-05-30 12:11:14',1,'Active'),(34,40,1,'2025-05-30 17:41:21','2025-05-30 12:11:21','2025-05-30 12:11:21',1,'Active'),(35,41,1,'2025-05-30 17:41:27','2025-05-30 12:11:27','2025-05-30 12:11:27',1,'Active'),(36,42,2,'2025-05-31 09:04:29','2025-05-31 03:34:29','2025-05-31 03:34:29',1,'Active');
/*!40000 ALTER TABLE `candidate_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company_id` bigint unsigned DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `experience` decimal(4,1) NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `education` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `current_ctc` decimal(10,2) NOT NULL,
  `expected_ctc` decimal(10,2) NOT NULL,
  `profile_pic` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resume` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `candidates_email_unique` (`email`),
  KEY `candidates_company_id_foreign` (`company_id`),
  KEY `candidates_source_id_foreign` (`source_id`),
  CONSTRAINT `candidates_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL,
  CONSTRAINT `candidates_source_id_foreign` FOREIGN KEY (`source_id`) REFERENCES `sources` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (22,5,'Sourabh','Baruwar','Developer',2.0,'1234567890','sourabh.testenvironment@gmail.com','India','Delhi','Not Specified',1234.00,12334.00,'candidates/profile_pics/6820b3a4c64e8.jpg',NULL,1,'2025-05-11 08:56:45','2025-05-17 17:02:47'),(32,5,'Souirabh','Doe','Software Engineer',3.5,'9876543210','abcd@gmail.com','India','Bangalore','Not Specified',600000.00,800000.00,NULL,NULL,NULL,'2025-05-30 12:09:23','2025-05-30 12:09:23'),(33,5,'Ritika','Singh','Frontend Developer',2.0,'9876501234','ritika.singh@example.com','India','Mumbai','Not Specified',450000.00,650000.00,NULL,NULL,NULL,'2025-05-30 12:10:11','2025-05-30 12:10:11'),(34,5,'Arjun','Patel','Backend Developer',4.2,'9823456780','arjun.patel@example.com','India','Pune','Not Specified',720000.00,900000.00,NULL,NULL,NULL,'2025-05-30 12:10:22','2025-05-30 12:10:22'),(35,5,'Neha','Verma','UI/UX Designer',3.0,'9845612378','neha.verma@example.com','India','Hyderabad','Not Specified',500000.00,700000.00,NULL,NULL,NULL,'2025-05-30 12:10:46','2025-05-30 12:10:46'),(36,5,'Karan','Yadav','Full Stack Developer',5.0,'9988776655','karan.yadav@example.com','India','Delhi','Not Specified',850000.00,1000000.00,NULL,NULL,NULL,'2025-05-30 12:10:53','2025-05-30 12:10:53'),(37,5,'Divya','Sharma','Software Engineer',2.8,'9812345678','divya.sharma@example.com','India','Chennai','Not Specified',520000.00,700000.00,NULL,NULL,NULL,'2025-05-30 12:11:01','2025-05-30 12:11:01'),(38,5,'Rohan','Nair','DevOps Engineer',4.5,'9871122334','rohan.nair@example.com','India','Kochi','Not Specified',750000.00,950000.00,NULL,NULL,NULL,'2025-05-30 12:11:08','2025-05-30 12:11:08'),(39,5,'Sneha','Kapoor','Data Analyst',3.1,'9898989898','sneha.kapoor@example.com','India','Noida','Not Specified',600000.00,800000.00,NULL,NULL,NULL,'2025-05-30 12:11:14','2025-05-30 12:11:14'),(40,5,'Manish','Thakur','QA Engineer',2.5,'9865432109','manish.thakur@example.com','India','Indore','Not Specified',480000.00,650000.00,NULL,NULL,NULL,'2025-05-30 12:11:21','2025-05-30 12:11:21'),(41,5,'Pooja','Reddy','Software Engineer',3.7,'9871112345','pooja.reddy@example.com','India','Bangalore','Not Specified',630000.00,850000.00,NULL,NULL,NULL,'2025-05-30 12:11:27','2025-05-30 12:11:27'),(42,5,'Vivek','Singh','Tester',1.0,'1234567890','abcd123@gmail.com','India','Delhi','BCA',12.00,12.00,'candidates/profile_pics/683ac61d53896.png','candidates/resumes/683ac61d55ce6.pdf',1,'2025-05-31 03:34:29','2025-05-31 03:34:29');
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int NOT NULL,
  `phone_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `evaluating_website` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'Sharencare Traders','www.cuchd.in',43,'1234567844','Recruiting','2025-05-10 15:29:25','2025-05-10 15:29:25'),(2,'Chandigarh University','www.cuchd.in',24,'1234567856','HR','2025-05-10 15:31:14','2025-05-10 15:31:14'),(3,'Chandigarh University','www.cuchd.in',243,'1234567853','HR','2025-05-10 15:35:11','2025-05-10 15:35:11'),(4,'Chandigarh University','www.cuchd.in',44,'1234567857','Recruiting','2025-05-10 15:36:05','2025-05-10 15:36:05'),(5,'Chandigarh University','www.cuchd.in',43,'1234567833','Recruiting','2025-05-10 15:47:03','2025-05-10 15:47:03'),(12,'Chandigarh University','www.cuchd.in',43,'1234567832','Recruiting','2025-05-20 12:48:48','2025-05-20 12:48:48');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compensation_details`
--

DROP TABLE IF EXISTS `compensation_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compensation_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` bigint unsigned NOT NULL,
  `salary_details` decimal(10,2) DEFAULT NULL,
  `bank_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iban` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `compensation_details_employee_id_foreign` (`employee_id`),
  CONSTRAINT `compensation_details_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compensation_details`
--

LOCK TABLES `compensation_details` WRITE;
/*!40000 ALTER TABLE `compensation_details` DISABLE KEYS */;
INSERT INTO `compensation_details` VALUES (3,3,10000.00,'HDFC','IBN-001','123123','2025-05-07 12:41:06','2025-05-07 12:41:06'),(4,4,NULL,'123131243','123342134',NULL,'2025-05-07 12:43:48','2025-05-07 12:43:48'),(5,5,NULL,'123131243','123342134',NULL,'2025-05-10 03:02:20','2025-05-10 03:02:20'),(10,10,NULL,'123131243','123342134',NULL,'2025-05-10 16:37:35','2025-05-10 17:12:55'),(11,11,NULL,'23rt4y','324t5y',NULL,'2025-05-10 18:07:19','2025-05-10 18:07:19'),(12,12,NULL,'EQW','QEW',NULL,'2025-05-10 18:11:40','2025-05-10 18:11:40'),(13,14,NULL,'EQW','QEW',NULL,'2025-05-10 18:18:16','2025-05-10 18:18:16'),(14,15,NULL,'sqdfew','wqdfege',NULL,'2025-05-10 18:22:51','2025-05-10 18:22:51'),(15,16,NULL,'HDFC','13245',NULL,'2025-05-11 09:40:13','2025-05-11 09:40:13'),(16,17,NULL,'HDFC','IBN_0001',NULL,'2025-05-18 09:51:06','2025-05-18 09:51:06');
/*!40000 ALTER TABLE `compensation_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emergency_contacts`
--

DROP TABLE IF EXISTS `emergency_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergency_contacts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` bigint unsigned NOT NULL,
  `contact_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emergency_contacts_employee_id_foreign` (`employee_id`),
  CONSTRAINT `emergency_contacts_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergency_contacts`
--

LOCK TABLES `emergency_contacts` WRITE;
/*!40000 ALTER TABLE `emergency_contacts` DISABLE KEYS */;
INSERT INTO `emergency_contacts` VALUES (1,3,'Personal','123123123','2025-05-07 12:41:07','2025-05-07 12:41:07'),(2,4,NULL,NULL,'2025-05-07 12:43:48','2025-05-07 12:43:48'),(3,5,NULL,NULL,'2025-05-10 03:02:20','2025-05-10 03:02:20'),(8,10,NULL,NULL,'2025-05-10 16:37:35','2025-05-10 16:37:35'),(9,11,NULL,NULL,'2025-05-10 18:07:19','2025-05-10 18:07:19'),(10,12,NULL,NULL,'2025-05-10 18:11:40','2025-05-10 18:11:40'),(11,14,NULL,NULL,'2025-05-10 18:18:16','2025-05-10 18:18:16'),(12,15,NULL,NULL,'2025-05-10 18:22:51','2025-05-10 18:22:51'),(13,16,NULL,NULL,'2025-05-11 09:40:13','2025-05-11 09:40:13'),(14,17,NULL,NULL,'2025-05-18 09:51:06','2025-05-18 09:51:06');
/*!40000 ALTER TABLE `emergency_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company_id` bigint unsigned DEFAULT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferred_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `social_media` text COLLATE utf8mb4_unicode_ci,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `marital_status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `work_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personal_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chat_video_call` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employees_work_email_unique` (`work_email`),
  UNIQUE KEY `employees_personal_email_unique` (`personal_email`),
  KEY `employees_company_id_foreign` (`company_id`),
  CONSTRAINT `employees_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (3,NULL,'Sourabh','Singh',NULL,NULL,'India','Kharar',NULL,'Male',NULL,'Single','7800055435','sourabh@gmail.com','sourabh@gmail.com',NULL,'profiles/jrppmbAPARioqXXRIZKCiMXMLswimM9ErF33chep.png','2025-05-07 12:41:06','2025-05-07 12:41:06'),(4,NULL,'sdcsd','cfdvd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,NULL,NULL,NULL,'2025-05-07 12:43:48','2025-05-07 12:43:48'),(5,NULL,'sdcsd','cfdvd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,NULL,NULL,NULL,NULL,'2025-05-10 03:02:20','2025-05-10 03:02:20'),(10,5,'Sourabh','Singh','Kumar',NULL,'India','Kharar',NULL,NULL,NULL,'Single',NULL,'sourabh.singh@gmail.com','sourabh.singh@gmail.comm',NULL,'profiles/huqiV4XxkkXfcIK5h8gc76zIwH0MKnyxT9faYRZs.jpg','2025-05-10 16:37:35','2025-05-11 09:34:40'),(11,5,'Amit','Kumar',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Married',NULL,'abcdd@gmail.com',NULL,NULL,'profiles/PxIsxcVZpMdn7pZOeRVYmuDp627u8SSFr22JQ8A2.jpg','2025-05-10 18:07:19','2025-05-11 09:35:30'),(12,5,'SWQDQ','DQEFW',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,'abcQEdd@gmail.com',NULL,NULL,NULL,'2025-05-10 18:11:40','2025-05-10 18:11:40'),(14,5,'SWQDQ','DQEFW',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,'abcQEdsdd@gmail.com',NULL,NULL,'profiles/04dQUhQwDkNxqwj6m1WIj8PuQ6PpbvysAnKWyFUw.png','2025-05-10 18:18:16','2025-05-10 18:18:16'),(15,5,'asc','casd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Single',NULL,'sourabh.casc@gmail.com',NULL,NULL,NULL,'2025-05-10 18:22:51','2025-05-10 18:22:51'),(16,5,'Vinay','Raj','Kumar',NULL,'Afghanistan',NULL,NULL,NULL,NULL,'Single',NULL,'vinay@gmail.com',NULL,NULL,'profiles/0SS77vVANYNOGGjIViDWke3BHTboJsEGjVmdOBJn.png','2025-05-11 09:40:13','2025-05-11 09:40:13'),(17,5,'Sunny','Singh',NULL,NULL,'India','Kharar',NULL,'Male',NULL,'Single',NULL,'sourabh.testenvironment@gmail.com','sourabh.testenvironment@gmail.com',NULL,'profiles/9oljIxkN8KJ1EAyu9LTX3QGO138nT1hMtZMPL7g0.png','2025-05-18 09:51:06','2025-05-18 09:51:06');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience_details`
--

DROP TABLE IF EXISTS `experience_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` bigint unsigned NOT NULL,
  `education` text COLLATE utf8mb4_unicode_ci,
  `job` text COLLATE utf8mb4_unicode_ci,
  `skill` text COLLATE utf8mb4_unicode_ci,
  `language` text COLLATE utf8mb4_unicode_ci,
  `resume` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `experience_details_employee_id_foreign` (`employee_id`),
  CONSTRAINT `experience_details_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience_details`
--

LOCK TABLES `experience_details` WRITE;
/*!40000 ALTER TABLE `experience_details` DISABLE KEYS */;
INSERT INTO `experience_details` VALUES (1,3,'BCA','Dev','PHP','English','resumes/sfaeofO0tJVWZB8QKTObdeWpxBKuLrb6CqO8qbRu.docx','2025-05-07 12:41:07','2025-05-07 12:41:07'),(2,4,NULL,NULL,NULL,NULL,NULL,'2025-05-07 12:43:48','2025-05-07 12:43:48'),(3,5,NULL,NULL,NULL,NULL,NULL,'2025-05-10 03:02:20','2025-05-10 03:02:20'),(8,10,'BA',NULL,'English',NULL,NULL,'2025-05-10 16:37:35','2025-05-10 17:52:50'),(9,11,NULL,NULL,NULL,NULL,NULL,'2025-05-10 18:07:19','2025-05-10 18:07:19'),(10,12,NULL,NULL,NULL,NULL,NULL,'2025-05-10 18:11:40','2025-05-10 18:11:40'),(11,14,NULL,NULL,NULL,NULL,NULL,'2025-05-10 18:18:16','2025-05-10 18:18:16'),(12,15,NULL,NULL,NULL,NULL,NULL,'2025-05-10 18:22:51','2025-05-10 18:22:51'),(13,16,NULL,NULL,NULL,NULL,NULL,'2025-05-11 09:40:13','2025-05-11 09:40:13'),(14,17,NULL,NULL,NULL,NULL,NULL,'2025-05-18 09:51:06','2025-05-18 09:51:06');
/*!40000 ALTER TABLE `experience_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_details`
--

DROP TABLE IF EXISTS `job_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` bigint unsigned NOT NULL,
  `job_title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hire_date` date DEFAULT NULL,
  `start_date` date NOT NULL,
  `entity` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `division` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `effective_date` date NOT NULL,
  `employment_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `workplace` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `work_schedule` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_details_employee_id_foreign` (`employee_id`),
  CONSTRAINT `job_details_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_details`
--

LOCK TABLES `job_details` WRITE;
/*!40000 ALTER TABLE `job_details` DISABLE KEYS */;
INSERT INTO `job_details` VALUES (3,3,'Developer','2025-05-07','2025-06-06','Sydney NSW, Australia','Engineering',NULL,'Vineet Anand','2025-05-06','Part-Time','Remote','2025-05-14','NA','NA','2025-05-07 12:41:06','2025-05-07 12:41:06'),(4,4,'cvsdv',NULL,'2025-05-01',NULL,NULL,NULL,NULL,'2025-05-01','Contractor','Onsite',NULL,'wedrr32','4r23','2025-05-07 12:43:48','2025-05-07 12:43:48'),(5,5,'cvsdv',NULL,'2025-05-01',NULL,NULL,NULL,NULL,'2025-05-01','Contractor','Onsite',NULL,'wedrr32','4r23','2025-05-10 03:02:20','2025-05-10 03:02:20'),(10,10,'cvsdv',NULL,'2025-05-01',NULL,NULL,NULL,'312456','2025-05-01','Contractor','Onsite',NULL,'wedrr32','4r23','2025-05-10 16:37:35','2025-05-10 17:12:55'),(11,11,'2134rt',NULL,'2025-05-22',NULL,NULL,NULL,'1`32455','2025-05-21','Part-Time',NULL,NULL,NULL,NULL,'2025-05-10 18:07:19','2025-05-10 18:07:19'),(12,12,'Q',NULL,'2025-05-21',NULL,NULL,NULL,'WSDQD','2025-05-14','Full-Time',NULL,NULL,NULL,NULL,'2025-05-10 18:11:40','2025-05-10 18:11:40'),(13,14,'Q',NULL,'2025-05-21',NULL,NULL,NULL,'WSDQD','2025-05-14','Full-Time',NULL,NULL,NULL,NULL,'2025-05-10 18:18:16','2025-05-10 18:18:16'),(14,15,'dqe',NULL,'2025-05-09',NULL,NULL,NULL,'dfewgehr','2025-05-27','Full-Time',NULL,NULL,NULL,NULL,'2025-05-10 18:22:51','2025-05-10 18:22:51'),(15,16,'Tester',NULL,'2025-05-20',NULL,NULL,NULL,'Abcd','2025-05-08','Full-Time','Onsite',NULL,NULL,NULL,'2025-05-11 09:40:13','2025-05-11 09:40:13'),(16,17,'Dev',NULL,'2025-05-30','Sydney NSW, Australia',NULL,NULL,'Sourabh','2025-05-28','Contractor',NULL,NULL,NULL,NULL,'2025-05-18 09:51:06','2025-05-18 09:51:06');
/*!40000 ALTER TABLE `job_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_posts`
--

DROP TABLE IF EXISTS `job_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company_id` bigint unsigned NOT NULL,
  `job_title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_workplace` enum('onsite','hybrid','remote') COLLATE utf8mb4_unicode_ci NOT NULL,
  `office_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `company_industry` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_function` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employment_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `experience` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `education` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requirements` text COLLATE utf8mb4_unicode_ci,
  `benefits` text COLLATE utf8mb4_unicode_ci,
  `keywords` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_department` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from_salary` decimal(10,2) NOT NULL DEFAULT '0.00',
  `to_salary` decimal(10,2) NOT NULL DEFAULT '0.00',
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USD',
  `create_by` int NOT NULL,
  `update_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_posts_job_code_unique` (`job_code`),
  KEY `job_posts_company_id_foreign` (`company_id`),
  CONSTRAINT `job_posts_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_posts`
--

LOCK TABLES `job_posts` WRITE;
/*!40000 ALTER TABLE `job_posts` DISABLE KEYS */;
INSERT INTO `job_posts` VALUES (1,1,'Data Scientist','123','Ambala','hybrid',NULL,'job description',NULL,'Devevlope','Part Time','Entry Level','Associate\'s Degree','job requirement','job benefit','python,Machine Learning','IT',20000.00,25000.00,'INR',1,5,'2025-05-10 05:51:06','2025-05-31 07:17:33'),(2,1,'Data Analyst','DAG-001','Gurgaon','hybrid',NULL,'We are seeking a highly motivated Full Stack Web Developer to join our dynamic engineering team. You will be responsible for designing, developing, and maintaining web applications that power our internal systems and customer-facing platforms. Competitive salary and annual performance bonuses',NULL,'42356','Part Time','Mid Level','Associate\'s Degree','BachelorÔÇÖs degree in Computer Science, Engineering, or a related field\n2+ years of experience in web or mobile application development\nProficient in JavaScript (React or Angular), Node.js or Python\nFamiliarity with RESTful APIs, Git, and agile workflows\nStrong problem-solving and debugging skills\nExcellent communication and teamwork abilities','Competitive salary and annual performance bonuses\nHybrid work environment with flexible hours\nHealth, dental, and vision insurance\n15+ days of paid time off plus national holidays\nLearning & development budget and paid certifications\nStock options or equity program','SQL,Excel,Python','Human Rerource',20000.00,30000.00,'EUR',5,5,'2025-05-31 04:02:41','2025-05-31 07:22:15'),(4,1,'Data Scientist','121','Gorakhpur','hybrid',NULL,'We are seeking a highly motivated Full Stack Web Developer to join our dynamic engineering team. You will be responsible for designing, developing, and maintaining web applications that power our internal systems and customer-facing platforms.',NULL,'Devevloper','Contract','Senior Level','Master\'s Degree','BachelorÔÇÖs degree in Computer Science, Engineering, or related field','Competitive salary with annual performance bonuses\n\nFlexible working hours and hybrid work environment','Python','Engineering',500000.00,800000.00,'INR',5,NULL,'2025-05-31 07:20:10','2025-05-31 07:20:10'),(11,5,'Data Scientist (Copy)','121-1748726067245','Gorakhpur','hybrid',NULL,'We are seeking a highly motivated Full Stack Web Developer to join our dynamic engineering team. You will be responsible for designing, developing, and maintaining web applications that power our internal systems and customer-facing platforms.',NULL,'Devevloper','Contract','Senior Level','Master\'s Degree','BachelorÔÇÖs degree in Computer Science, Engineering, or related field','Competitive salary with annual performance bonuses\n\nFlexible working hours and hybrid work environment','Python','Engineering',500000.00,800000.00,'INR',5,5,'2025-05-31 15:44:28','2025-05-31 15:44:40');
/*!40000 ALTER TABLE `job_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `legal_documents`
--

DROP TABLE IF EXISTS `legal_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `legal_documents` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` bigint unsigned NOT NULL,
  `social_security_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_date_s_s_n` date DEFAULT NULL,
  `ssn_file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `national_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_date_national_id` date DEFAULT NULL,
  `national_id_file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_insurance_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_date_tax_id` date DEFAULT NULL,
  `tax_id_file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `citizenship` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationality` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passport` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `work_visa` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visa_details` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `legal_documents_employee_id_foreign` (`employee_id`),
  CONSTRAINT `legal_documents_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `legal_documents`
--

LOCK TABLES `legal_documents` WRITE;
/*!40000 ALTER TABLE `legal_documents` DISABLE KEYS */;
INSERT INTO `legal_documents` VALUES (3,3,'SSN-001','2025-05-19','legal_docs/Pnn7HXeB1K9JwwywdkNqwvqRANrZt4eWC9RhpsHn.png','NIN-001','2025-05-07','legal_docs/vkzXF8GLVsUyrQwNwAmL39Ol04yY2eE3Ecao1Jie.png','SSN-001','TIN-001','2025-05-07','legal_docs/oENtxTADEAaaM5IadZXVXX9UHnIThu0sNGT3tPq0.pdf','India','India','NA','NA','NA','2025-05-07 12:41:06','2025-05-07 12:41:06'),(4,4,'1231243134',NULL,NULL,'1312vngd',NULL,NULL,NULL,'q233',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-07 12:43:48','2025-05-07 12:43:48'),(5,5,'1231243134',NULL,NULL,'1312vngd',NULL,NULL,NULL,'q233',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-10 03:02:20','2025-05-10 03:02:20'),(10,10,'1231243134',NULL,NULL,'1312vngd',NULL,NULL,NULL,'q233',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-10 16:37:35','2025-05-10 17:12:55'),(11,11,'1`234t',NULL,NULL,'w2e23r4t',NULL,NULL,NULL,'qwer3ty',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-10 18:07:19','2025-05-10 18:07:19'),(12,12,'EQ',NULL,NULL,'WEQWE',NULL,NULL,NULL,'QSWQWD',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-10 18:11:40','2025-05-10 18:11:40'),(13,14,'EQ',NULL,NULL,'WEQWE',NULL,NULL,NULL,'QSWQWD',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-10 18:18:16','2025-05-10 18:18:16'),(14,15,'sqwd',NULL,NULL,'wqsqw',NULL,NULL,NULL,'asqw',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-10 18:22:51','2025-05-10 18:22:51'),(15,16,'2`134',NULL,NULL,'1`324',NULL,NULL,NULL,'2`134',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-11 09:40:13','2025-05-11 09:40:13'),(16,17,'SSN-111',NULL,NULL,'INN001',NULL,NULL,NULL,'TIN001',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-18 09:51:06','2025-05-18 09:51:06');
/*!40000 ALTER TABLE `legal_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2025_03_22_041228_sharencare',1),(6,'2025_04_01_161028_job_post',1),(7,'2025_05_03_055249_create_employees_table',1),(8,'2025_05_03_055250_create_job_details_table',1),(9,'2025_05_03_055251_create_compensation_details_table',1),(10,'2025_05_03_055251_create_emergency_contacts_table',1),(11,'2025_05_03_055252_create_experience_details_table',1),(12,'2025_05_03_062917_create_legal_documents_table',1),(13,'2025_05_09_173400_create_companies_table',2),(14,'2025_05_09_163234_create_companies_table',3),(15,'2025_05_09_163641_create_sources_table',4),(16,'2025_05_07_163234_create_companies_table',5),(24,'2025_05_03_123641_create_sources_table',6),(25,'2025_05_04_133234_create_companies_table',6),(30,'2025_05_10_074652_add_company_id_to_employees_table',7),(31,'2025_05_10_041007_update_users_table_for_company_relation',8),(32,'2025_05_09_173411_create_candidates_table',9),(33,'2025_05_09_180019_create_candidate_applications_table',9),(43,'2025_05_16_000786_create_stages_table',10),(44,'2025_05_16_001020_update_candidate_applications_table',10),(45,'2025_05_18_001241_create_candidate_application_logs_table',10),(46,'2025_05_18_005713_create_candidate_application_comments_table',10),(47,'2025_05_18_005713_create_candidate_application_communications_table',10),(48,'2025_05_18_005714_create_candidate_application_reviews_table',10),(49,'2025_05_18_082539_remove_firstname_lastname_from_users_table',11),(51,'2025_05_18_083810_add_employee_id_to_users_table',12),(52,'2025_05_24_145356_add_email_and_country_to_candidates_table',13),(53,'2025_05_24_185142_fix_null_emails_and_country_in_candidates',14),(54,'2025_05_24_193735_update_email_country_constraints_on_candidates_table',15),(56,'2025_05_31_085212_add_education_nullable_to_candidates_table',16),(57,'2025_05_31_085254_fill_default_education_for_candidates',17),(58,'2025_05_31_085346_make_education_required_on_candidates_table',18),(59,'2025_05_31_123444_add_requirements_and_benefits_to_job_posts_table',19),(61,'2025_05_31_193359_add_company_id_to_job_posts',20);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sources`
--

DROP TABLE IF EXISTS `sources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sources` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sources_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources`
--

LOCK TABLES `sources` WRITE;
/*!40000 ALTER TABLE `sources` DISABLE KEYS */;
INSERT INTO `sources` VALUES (1,'LinkedIn','2025-05-10 00:57:16','2025-05-10 00:57:16'),(2,'Indeed','2025-05-10 00:57:17','2025-05-10 00:57:17'),(3,'Referral','2025-05-10 00:57:17','2025-05-10 00:57:17'),(4,'Company Website','2025-05-10 00:57:17','2025-05-10 00:57:17'),(5,'Walk-in','2025-05-10 00:57:17','2025-05-10 00:57:17'),(6,'Email Campaign','2025-05-10 00:57:17','2025-05-10 00:57:17'),(7,'Careers Page','2025-05-10 00:57:17','2025-05-10 00:57:17');
/*!40000 ALTER TABLE `sources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stages`
--

DROP TABLE IF EXISTS `stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stages` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stages`
--

LOCK TABLES `stages` WRITE;
/*!40000 ALTER TABLE `stages` DISABLE KEYS */;
INSERT INTO `stages` VALUES (1,'Sourced',NULL,NULL),(2,'Applied',NULL,NULL),(3,'Phone Screen',NULL,NULL),(4,'Assessment',NULL,NULL),(5,'Interview',NULL,NULL),(6,'Offer',NULL,NULL),(7,'Hired',NULL,NULL);
/*!40000 ALTER TABLE `stages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company_id` bigint unsigned DEFAULT NULL,
  `employee_id` bigint unsigned DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1' COMMENT ' 1 yes, 0 no',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_company_id_foreign` (`company_id`),
  KEY `users_employee_id_foreign` (`employee_id`),
  CONSTRAINT `users_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,10,'email4workonpceferf@gmail.com','$2y$12$MKKtDQf.OO4YMCOh2ftPzOEkt1Rr1cYJ9pQipszrmyPSLI6/brFHu',3,NULL,1,NULL,'2025-05-10 15:29:25','2025-05-10 15:29:25'),(2,2,14,'donate2serve5@gmail.com','$2y$12$20dsADrWcP.HMON4Sk54c.QlomIts2eXyZ3PSyzsdobvflFBwprvS',2,NULL,1,NULL,'2025-05-10 15:31:14','2025-05-10 15:31:14'),(3,3,16,'alex@example.com','$2y$12$sAd27Vn9jAYF9bR.qiLaHun26UkutpFqT.iasjJP6JnlQ0yXSxmI2',2,NULL,1,NULL,'2025-05-10 15:35:11','2025-05-10 15:35:11'),(4,4,14,'alex@examplee.com','$2y$12$pslbC.QfAqB5BygTEG/Gl.MtVzbqr3wZOE2604.2YflD54JfjuPeK',1,NULL,1,NULL,'2025-05-10 15:36:05','2025-05-10 15:36:05'),(5,5,10,'22MCC20158@cuchd.in','$2y$12$veORnqWOkYqmBc4r6VoiOe9aHBdOTOeGc65aHRHELVcbtJy/61JXO',3,NULL,1,NULL,'2025-05-10 15:47:04','2025-05-10 15:47:04'),(11,12,NULL,'sourabh.testenvironment@gmail.com','$2y$12$Ojhy1eizgDScZn71KSofG.g/nEAH.EmdSCCEz1.hho1GbqkttapI.',3,NULL,1,NULL,'2025-05-20 12:48:49','2025-05-20 12:48:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11  7:52:27
