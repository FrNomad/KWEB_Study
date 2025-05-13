CREATE TABLE `students` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `batch` INT NOT NULL,
    `major` INT NOT NULL,
    `personal_number` INT NOT NULL,
    `phone_number` VARCHAR(12) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `total_credit` INT NOT NULL DEFAULT 0,
    `average_gpa` DOUBLE NOT NULL DEFAULT 0.0,
    `enroll` TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;