DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE IF NOT EXISTS groupomania;
USE groupomania;


----------------------------------- Création des tables(avec les CONTRAINTES) ---------------------------------------


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `job` varchar(70) NOT NULL,
  `image_profil` varchar(150) DEFAULT NULL,
  `role` varchar(7) DEFAULT 'User',
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `Userid` int unsigned NOT NULL,
  `userRole` varchar(7) DEFAULT NULL,
  `likes` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_post_user` (`Userid`),
  CONSTRAINT `fk_post_user` FOREIGN KEY (`Userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `PostId` smallint unsigned NOT NULL,
  `OwnerId` int unsigned NOT NULL,
  `likes` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_comment_post` (`PostId`),
  KEY `fk_comment_user` (`OwnerId`),
  CONSTRAINT `fk_comment_post` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`OwnerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `like_posts`;
CREATE TABLE `like_posts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `PostId` smallint unsigned DEFAULT NULL,
  `OwnerId` int unsigned DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_like` (`PostId`),
  KEY `fk_user_like` (`OwnerId`),
  CONSTRAINT `fk_post_like` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_like` FOREIGN KEY (`OwnerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--------------******** À EXÉCUTÉ UNIQUEMENT APRÈS AVOIR CREER VOTRE 1ER UTILISATEUR DEPUIS LE FRONT *********-----------------------

UPDATE USERS
SET role = 'Admin'
WHERE id = 1;