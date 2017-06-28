-- singer 表
DROP TABLE IF EXISTS singer;
CREATE TABLE IF NOT EXISTS `singer` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=41 ;
INSERT INTO `singer` (`id`, `title`, `url`) VALUES
(1, '内地偶像组合', '/KTV/public/img/song/singer_03.png'),
(2, '内地男歌手', '/KTV/public/img/song/singer_07.png'),
(3, '港台歌手', '/KTV/public/img/song/singer_09.png'),
(4, '日韩女歌手', '/KTV/public/img/song/singer_11_01.png'),
(5, '内—地<br>女歌手', '/KTV/public/img/song/singer_15.png'),
(6, '青春偶像<br>\r\n男 歌 手', '/KTV/public/img/song/singer_16.png');


-- singer_1 表
DROP TABLE IF EXISTS singer_1;
CREATE TABLE IF NOT EXISTS `singer_1` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `cid` int(12) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;
INSERT INTO `singer_1` (`id`, `cid`, `name`, `url`) VALUES
(1, 1, '蔡妍', '/KTV/public/img/song/hsj_05.png'),
(2, 2, '薛之谦', '/KTV/public/img/song/hsj_05.png'),
(3, 1, 'SHE', '/KTV/public/img/song/hsj_17.png'),
(4, 1, '王菲', '/KTV/public/img/song/hsj_14.png'),
(5, 5, '阿悄', '/KTV/public/img/song/hsj_17.png'),
(6, 6, '许嵩', '/KTV/public/img/song/hsj_08.png'),
(7, 4, 'SHE', '/KTV/public/img/song/hsj_17.png'),
(8, 3, '阿悄', '/KTV/public/img/song/hsj_17.png');
/*(9, 1, '梁静茹', '/KTV/public/img/song/hsj_04.png'),
(10, 1, '神马乐团', '/KTV/public/img/song/hsj_06.png'),
(11, 1, '那英', '/KTV/public/img/song/hsj_22.png'),
(12, 1, '王菲', '/KTV/public/img/song/hsj_08.png'),
(13, 1, '蔡健雅', '/KTV/public/img/song/hsj_04.png'),
(16, 1, '蔡妍', '/KTV/public/img/song/hsj_05.png'),
(17, 2, '魏新雨', '/KTV/public/img/song/hsj_22.png');*/

-- singer_view 视图
DROP VIEW IF EXISTS singer_view;
CREATE VIEW singer_view AS
SELECT c.* , a.title as style
FROM singer as a,singer_1 as c
WHERE a.id = c.cid;

-- song_list 表
DROP TABLE IF EXISTS song1_list;
CREATE TABLE song1_list(
id INT (12) PRIMARY KEY AUTO_INCREMENT,
name VARCHAR (255),
url VARCHAR (255),
duration VARCHAR (255),
aid INT (12)
)DEFAULT CHARSET=utf8;
INSERT INTO song1_list (name, url, duration, aid) VALUES
('你还要我怎样','/KTV/public/music/01.mp3','04:34','2'),
('演员','/KTV/public/music/02.mp3','04:04','2'),
('不想长大','/KTV/public/music/03.mp3','05:34','3'),
('多余的解释','/KTV/public/music/04.mp3','03:54','6');



DROP VIEW IF EXISTS song_view;
CREATE VIEW song_view AS
SELECT a.* , c.name as artist_name
FROM song1_list as a,singer_1 as c
WHERE a.aid = c.id;