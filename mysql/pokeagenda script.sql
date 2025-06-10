SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema agendapoke
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `agendapoke` DEFAULT CHARACTER SET utf8;
USE `agendapoke`;

-- -----------------------------------------------------
-- Table `usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `agendas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agendas`;
CREATE TABLE IF NOT EXISTS `agendas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuarios_id` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `porc_presenca_minima` DECIMAL(5,2) NULL DEFAULT 75.00,
  PRIMARY KEY (`id`),
  INDEX `fk_agendas_usuarios_idx` (`usuarios_id` ASC),
  CONSTRAINT `fk_agendas_usuarios`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `aulas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aulas`;
CREATE TABLE IF NOT EXISTS `aulas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `agendas_id` INT NOT NULL,
  `aula_nome` VARCHAR(100) NOT NULL,
  `dia_da_semana` ENUM('domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado') NOT NULL,
  `horario_inicio` TIME NULL,
  `horario_fim` TIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_aulas_agendas1_idx` (`agendas_id` ASC),
  CONSTRAINT `fk_aulas_agendas1`
    FOREIGN KEY (`agendas_id`)
    REFERENCES `agendas` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `presenca`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `presenca`;
CREATE TABLE IF NOT EXISTS `presenca` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `aulas_id` INT NOT NULL,
    `dia_aula` DATE NOT NULL,
    `presenca` TINYINT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `aulas_id_dia_aula_UNIQUE` (`aulas_id` , `dia_aula` ASC),
    INDEX `fk_presenca_aulas1_idx` (`aulas_id` ASC),
    CONSTRAINT `fk_presenca_aulas1` FOREIGN KEY (`aulas_id`)
        REFERENCES `aulas` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=INNODB;

-- Restaurar configurações anteriores
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



select * from usuarios