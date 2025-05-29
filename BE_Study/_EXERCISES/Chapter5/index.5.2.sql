--5.2.1
SELECT `users`.`id`, `name`, `seat_number`
 FROM `users`
 INNER JOIN `tickets` ON `users`.`id` = `tickets`.`user`
 WHERE `tickets`.`train`=11
 ORDER BY `tickets`.`seat_number`;

--5.2.2
SELECT `users`.`id`, `users`.`name`,
 Count(*) AS `trains_count`, Sum(`distance`) * .1 AS `total_distance`
 FROM `users`
 INNER JOIN `tickets` ON `users`.`id` = `tickets`.`user`
 INNER JOIN `trains` ON `tickets`.`train` = `trains`.`id`
 GROUP BY `users`.`id`
 ORDER BY `total_distance` DESC
 LIMIT 0, 6;

--5.2.3
SELECT `trains`.`id`,
 `types`.`name` AS `type`,
 `src`.`name` AS `src_stn`,
 `dst`.`name` AS `dst_stn`,
 Timediff(`arrival`, `departure`) AS `travel_time`
 FROM `trains`
 INNER JOIN `types` ON `trains`.`type` = `types`.`id`
 INNER JOIN `stations` AS `src` ON `trains`.`source` = `src`.`id`
 INNER JOIN `stations` AS `dst` ON `trains`.`destination` = `dst`.`id`
 ORDER BY `travel_time` DESC
 LIMIT 0, 6;

--5.2.4
SELECT `types`.`name` AS `type`,
 `src`.`name` AS `src_stn`,
 `dst`.`name` AS `dst_stn`,
 `departure`, `arrival`,
 Round(`types`.`fare_rate` * `trains`.`distance` / 100000) * 100 AS `fare`
 FROM `trains`
 INNER JOIN `types` ON `trains`.`type` = `types`.`id`
 INNER JOIN `stations` AS `src` ON `trains`.`source` = `src`.`id`
 INNER JOIN `stations` AS `dst` ON `trains`.`destination` = `dst`.`id`
 ORDER BY `departure`;

--5.2.5
SELECT `trains`.`id`,
 `types`.`name` AS `type`,
 `src`.`name` AS `src_stn`,
 `dst`.`name` AS `dst_stn`,
 Count(*) AS `occupied`,
 `types`.`max_seats` AS `maximum`
 FROM `tickets`
 INNER JOIN `trains` ON `tickets`.`train` = `trains`.`id`
 INNER JOIN `types` ON `trains`.`type` = `types`.`id`
 INNER JOIN `stations` AS `src` ON `trains`.`source` = `src`.`id`
 INNER JOIN `stations` AS `dst` ON `trains`.`destination` = `dst`.`id`
 GROUP BY `trains`.`id`
 ORDER BY `trains`.`id`;

--5.2.6
SELECT `trains`.`id`,
 `types`.`name` AS `type`,
 `src`.`name` AS `src_stn`,
 `dst`.`name` AS `dst_stn`,
 Count(`tickets`.`id`) AS `occupied`,
 `types`.`max_seats` AS `maximum`
 FROM `tickets`
 RIGHT OUTER JOIN `trains` ON `tickets`.`train` = `trains`.`id`
 INNER JOIN `types` ON `trains`.`type` = `types`.`id`
 INNER JOIN `stations` AS `src` ON `trains`.`source` = `src`.`id`
 INNER JOIN `stations` AS `dst` ON `trains`.`destination` = `dst`.`id`
 GROUP BY `trains`.`id`
 ORDER BY `trains`.`id`;