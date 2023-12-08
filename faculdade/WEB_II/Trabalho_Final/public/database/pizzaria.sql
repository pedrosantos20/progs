-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: pizzaria
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `bebida`
--

DROP TABLE IF EXISTS `bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bebida` (
  `Bcod` int NOT NULL,
  `Nome` varchar(20) NOT NULL,
  `Preco` double NOT NULL,
  PRIMARY KEY (`Bcod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bebida`
--

LOCK TABLES `bebida` WRITE;
/*!40000 ALTER TABLE `bebida` DISABLE KEYS */;
INSERT INTO `bebida` VALUES (1,'coca',7.5),(2,'guaraná',8.5),(3,'polar',10),(4,'heineken',12),(5,'budweiser',12),(6,'sprite',7.5),(7,'agua',5);
/*!40000 ALTER TABLE `bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bebida_pedido`
--

DROP TABLE IF EXISTS `bebida_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bebida_pedido` (
  `Cod_Pedido` int NOT NULL,
  `Bcod` int NOT NULL,
  `qtd` int NOT NULL,
  KEY `bebida_pedido_ibfk_1` (`Bcod`),
  KEY `bebida_pedido_ibfk_2` (`Cod_Pedido`),
  CONSTRAINT `bebida_pedido_ibfk_1` FOREIGN KEY (`Bcod`) REFERENCES `bebida` (`Bcod`),
  CONSTRAINT `bebida_pedido_ibfk_2` FOREIGN KEY (`Cod_Pedido`) REFERENCES `pedido` (`Cod_Pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bebida_pedido`
--

LOCK TABLES `bebida_pedido` WRITE;
/*!40000 ALTER TABLE `bebida_pedido` DISABLE KEYS */;
INSERT INTO `bebida_pedido` VALUES (4,3,1),(5,3,1),(6,3,1),(7,3,1),(8,7,2),(10,5,1),(11,1,2),(11,3,1);
/*!40000 ALTER TABLE `bebida_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `CPF` varchar(11) NOT NULL,
  `Nome` varchar(20) NOT NULL,
  `Endereco` text NOT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`CPF`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES ('001','Pedro','rua a','$2b$10$Elhoql2HeWX6yfVI9FiKvOcQVbKXltjD0Qg7fToqR4UHF/8qgj3eK','email@email.com'),('0013','kevin','rua 25','$2b$10$KzqHdZvWlMHdcK3HE3zCpeKT4dgCzzYTweSwrkKFFZ0hVzBkYG43O','kevin@email.com'),('003','Pedro2','rua c','$2b$10$/Vle9A9ZNGj5pcUyqOA2aOCNgJyvFuXJ2zeiMMkASErSOeb8I3LMm','emai2@email.com'),('005','Pedro Henrique ','rua 4','$2b$10$gDY2iKov2HzFGactxLY6Tu9.tcOg0ZrnGpyEYHiJdH3aVZBfdRghW','pedro@gmail.com'),('009','Pedro Henrique ','rua 4','$2b$10$JmSI5xm1h0PxUvaKVL8jhOPXZpW8YIMor/M..E6oIbzU2Jk6fNWQe','pedro@gmail.com');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `Cod_Pedido` int NOT NULL AUTO_INCREMENT,
  `CPF` varchar(11) NOT NULL,
  `Valor` double NOT NULL,
  `Pagamento` varchar(15) NOT NULL,
  PRIMARY KEY (`Cod_Pedido`),
  KEY `pedido_ibfk_1` (`CPF`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`CPF`) REFERENCES `cliente` (`CPF`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (2,'001',40,'PIX'),(3,'001',45,'PIX'),(4,'001',40,'PIX'),(5,'001',40,'PIX'),(6,'001',40,'PIX'),(7,'001',40,'PIX'),(8,'0013',72,'PIX'),(9,'0013',40,'PIX'),(10,'0013',32,'PIX'),(11,'0013',65,'PIX');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pizza`
--

DROP TABLE IF EXISTS `pizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pizza` (
  `Pcod` int NOT NULL,
  `Nome` varchar(20) NOT NULL,
  `Ingredientes` text NOT NULL,
  `Preco` double NOT NULL,
  PRIMARY KEY (`Pcod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pizza`
--

LOCK TABLES `pizza` WRITE;
/*!40000 ALTER TABLE `pizza` DISABLE KEYS */;
INSERT INTO `pizza` VALUES (1,'calabresa','calabresa, queijo, molho, massa.',20),(2,'frango com catupiry','frango, catupiry, queijo, molho, massa.',20),(3,'4 queijos','Cheddar, Catupiry, mussarela, parmesão, molho, massa.',19),(4,'strcarne','strogonoff, molho, queijo, massa',25),(5,'strfrango','strogonoff, molho, queijo, massa',23),(6,'camarao','camarao, molho, queijo, massa',30),(7,'chocolate preto','chocolate preto, massa',22),(8,'chocolate branco','chocolate branco, massa',22),(9,'chocomorango','chocolate preto, morango, massa',24);
/*!40000 ALTER TABLE `pizza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pizza_pedido`
--

DROP TABLE IF EXISTS `pizza_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pizza_pedido` (
  `Pcod` int NOT NULL,
  `Cod_Pedido` int NOT NULL,
  `qtd` int NOT NULL,
  KEY `pizza_pedido_ibfk_1` (`Pcod`),
  KEY `pizza_pedido_ibfk_2` (`Cod_Pedido`),
  CONSTRAINT `pizza_pedido_ibfk_1` FOREIGN KEY (`Pcod`) REFERENCES `pizza` (`Pcod`),
  CONSTRAINT `pizza_pedido_ibfk_2` FOREIGN KEY (`Cod_Pedido`) REFERENCES `pedido` (`Cod_Pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pizza_pedido`
--

LOCK TABLES `pizza_pedido` WRITE;
/*!40000 ALTER TABLE `pizza_pedido` DISABLE KEYS */;
INSERT INTO `pizza_pedido` VALUES (1,3,1),(4,3,1),(6,4,1),(6,5,1),(6,6,1),(6,7,1),(1,8,2),(7,8,1),(2,9,2),(1,10,1),(1,11,2);
/*!40000 ALTER TABLE `pizza_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'pizzaria'
--

--
-- Dumping routines for database 'pizzaria'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-07 22:22:55
