-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11/09/2023 às 01:36
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `clientedb1`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cliente`
--

CREATE TABLE `cliente` (
  `cod` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `data_do_pedido` date DEFAULT NULL,
  `produto1` varchar(50) DEFAULT NULL,
  `qtd_prod1` int(11) DEFAULT NULL,
  `produto2` varchar(50) DEFAULT NULL,
  `qtd_prod2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cliente`
--

INSERT INTO `cliente` (`cod`, `nome`, `endereco`, `data_do_pedido`, `produto1`, `qtd_prod1`, `produto2`, `qtd_prod2`) VALUES
(6, 'Éricles', 'Rua 1, Casa 3', '2019-03-01', 'HONDA CB 500', 1, '', 0),
(7, 'Éricles', 'Rua 1, Casa 3', '2019-03-02', 'HARLEY DAVIDSSON', 1, '', 0),
(8, 'Miguel', 'Rua 2, Casa 6', '2019-03-01', 'FAZENDA', 1, 'LANCHA', 2),
(9, 'Lucilene', 'Rua 3, Casa 4', '2019-03-01', 'LANCHA', 1, '', 0),
(10, 'Robson Araújo', 'Rua 4, Casa 1', '2019-03-03', 'DELL\"16GB RAM', 1, '', 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`cod`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
