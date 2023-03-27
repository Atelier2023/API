SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
    `id_user` int(11) NOT NULL AUTO_INCREMENT,
    `firstname` varchar(128) NOT NULL,
    `email` varchar(128) NOT NULL,
    `password` varchar(128) NOT NULL,
    `tel_number` int(12) NOT NULL,
    `address` varchar(128),
    PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `RDV`;
CREATE TABLE `RDV` (
    `id_RDV` int(11) NOT NULL AUTO_INCREMENT,
    `date_RDV` datetime NOT NULL,
    `address` varchar(128) NOT NULL,
    `before` bool DEFAULT false,
    `after` bool DEFAULT false,
    `state` enum('in progress', 'coming', 'completed') DEFAULT 'coming' NOT NULL,
    `id_user` int(11),
    FOREIGN KEY (`id_user`) REFERENCES User(id_user),
    PRIMARY KEY (`id_RDV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `Participant`;
CREATE TABLE `Participant` (
    `id_participant` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(128) NOT NULL,
    `firstname` varchar(128) NOT NULL,
    `tel_number` int(12) NOT NULL,
    `address` varchar(128),
    `state` enum('present', 'missing', 'not answered') DEFAULT 'not answered' NOT NULL,
    `id_RDV` int(11),
    FOREIGN KEY (`id_RDV`) REFERENCES RDV(id_RDV),
    PRIMARY KEY (`id_participant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;