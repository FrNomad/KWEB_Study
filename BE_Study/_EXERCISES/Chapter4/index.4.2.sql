CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(20) NOT NULL,
    `user_password` VARCHAR(33) NOT NULL,
    `nickname` VARCHAR(20) NOT NULL,
    `icon_url` VARCHAR(100) NOT NULL,
    `status_message` VARCHAR(100) NOT NULL,
    `quit` TINYINT(1) NOT NULL DEFAULT 0,
    `join_date` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `channels` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `create_user` INT NOT NULL,
    `channel_url` VARCHAR(100) NOT NULL,
    `maximum_capacity` INT NOT NULL,
    `quit` TINYINT(1) NOT NULL DEFAULT 0,
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`create_user`)
    REFERENCES `users`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `chats` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(1000) NOT NULL,
    `author` INT NOT NULL,
    `channel` INT NOT NULL,
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`author`)
    REFERENCES `users`(`id`) ON DELETE RESTRICT,
    FOREIGN KEY (`channel`)
    REFERENCES `channels`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `follows` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `follower` INT NOT NULL,
    `followee` INT NOT NULL,
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`follower`)
    REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`followee`)
    REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `blocks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `blocked` INT NOT NULL,
    `by` INT NOT NULL,
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`blocked`)
    REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`by`)
    REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;