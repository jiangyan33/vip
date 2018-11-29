/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost
 Source Database       : video

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : utf-8

 Date: 11/29/2018 14:34:53 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `colmovie`
-- ----------------------------
DROP TABLE IF EXISTS `colmovie`;
CREATE TABLE `colmovie` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `movie_url` varchar(50) DEFAULT NULL,
  `user_id` int(20) DEFAULT NULL,
  `addtime` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=gbk;

-- ----------------------------
--  Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(500) DEFAULT NULL,
  `movie_id` int(20) DEFAULT NULL,
  `user_id` int(20) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=gbk;

-- ----------------------------
--  Table structure for `interface`
-- ----------------------------
DROP TABLE IF EXISTS `interface`;
CREATE TABLE `interface` (
  `id` int(11) NOT NULL,
  `interface_name` varchar(255) DEFAULT NULL,
  `interface_url` varchar(255) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
--  Table structure for `movies`
-- ----------------------------
DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  `info` varchar(500) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `score` varchar(50) DEFAULT NULL,
  `playnum` int(50) DEFAULT NULL,
  `commentnum` int(50) DEFAULT NULL,
  `release_time` datetime DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `little_score` int(11) DEFAULT NULL,
  `source` int(11) DEFAULT NULL COMMENT '1为用户上传，2为网上下载',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=gbk;

-- ----------------------------
--  Records of `movies`
-- ----------------------------
BEGIN;
INSERT INTO `movies` VALUES ('106', '邪不压正', 'http://www.iqiyi.com/v_19rrfcw5e8.html', '姜文彭于晏大打出手', '/www/uploads/image/1543468808681v_19rrfcw5e8.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '9', '2'), ('107', '功夫联盟', 'http://www.iqiyi.com/v_19rr8u7qco.html', '武侠宗师巅峰对决', '/www/uploads/image/1543468808682v_19rr8u7qco.jpg', '6', '1', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '4', '2'), ('108', '唐门龙棺凤胆', 'http://www.iqiyi.com/v_19rr3w3um8.html', '蜀中唐门引爆夺宝大战', '/www/uploads/image/1543468808683v_19rr3w3um8.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '5', '2'), ('109', '悲伤逆流成河', 'http://www.iqiyi.com/v_19rrcswefs.html', '郭敬明揭校园暴力', '/www/uploads/image/1543468808683v_19rrcswefs.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '6', '2'), ('110', '嗝嗝老师', 'http://www.iqiyi.com/v_19rr4pxoyw.html', '励志老师点石成金', '/www/uploads/image/1543468808683v_19rr4pxoyw.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '7', '2'), ('111', '我不是药神', 'http://www.iqiyi.com/v_19rreozmq8.html', '30亿票房口碑爆款', '/www/uploads/image/1543468808683v_19rreozmq8.jpg', '9', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '1', '2'), ('112', '喊·山', 'http://www.iqiyi.com/v_19rr9ggp9w.html', '釜山电影节闭幕影片', '/www/uploads/image/1543468808684v_19rr9ggp9w.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '9', '2'), ('113', '西虹市首富', 'http://www.iqiyi.com/v_19rrf2nw1g.html', '沈腾变身暴富锦鲤', '/www/uploads/image/1543468808684v_19rrf2nw1g.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '8', '2'), ('114', '偷芯攻略', 'http://www.iqiyi.com/v_19rr6ihex4.html', '暖心少女偷芯换爱', '/www/uploads/image/1543468808684v_19rr6ihex4.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '2', '2'), ('115', '新七侠五义之屠龙案', 'http://www.iqiyi.com/v_19rr417ygo.html', '白玉堂与展昭携手破案', '/www/uploads/image/1543468808684v_19rr417ygo.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '4', '2'), ('116', '妖狐苏妲己', 'http://www.iqiyi.com/v_19rr2t9624.html', '国民女神化身苏妲己', '/www/uploads/image/1543468808684v_19rr2t9624.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '3', '2'), ('117', '恶战', 'http://www.iqiyi.com/v_19rrnf368g.html', '基情好兄弟抗日誓复仇', '/www/uploads/image/1543468808684v_19rrnf368g.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '8', '2'), ('118', '雷神3：诸神黄昏', 'http://www.iqiyi.com/v_19rr7qiwaw.html', '雷神终极试炼', '/www/uploads/image/1543468808684v_19rr7qiwaw.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '4', '2'), ('119', '特殊身份', 'http://www.iqiyi.com/v_19rriful2y.html', '甄子丹街头搏杀飚车', '/www/uploads/image/1543468808684v_19rriful2y.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '7', '2'), ('120', '第九区', 'http://www.iqiyi.com/v_19rrifvp1k.html', '外星难民地球生存记', '/www/uploads/image/1543468808685v_19rrifvp1k.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '2', '2'), ('121', '新乌龙院之笑闹江湖', 'http://www.iqiyi.com/v_19rrbrdcz0.html', '吴孟达重现经典', '/www/uploads/image/1543468808685v_19rrbrdcz0.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '6', '2'), ('122', '传奇的诞生', 'http://www.iqiyi.com/v_19rr7p18hw.html', '球王贝利的少年时代', '/www/uploads/image/1543468808685v_19rr7p18hw.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '7', '2'), ('123', '无敌破坏王', 'http://www.iqiyi.com/v_19rrho8y7g.html', '大反派逆袭从良记', '/www/uploads/image/1543468808685v_19rrho8y7g.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '9', '2'), ('124', '大师兄', 'http://www.iqiyi.com/v_19rr0xafmg.html', '甄子丹以拳教学', '/www/uploads/image/1543468808685v_19rr0xafmg.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '6', '2'), ('125', '一出好戏', 'http://www.iqiyi.com/v_19rrc17tj8.html', '黄渤导演处女作', '/www/uploads/image/1543468808685v_19rrc17tj8.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '5', '2'), ('126', '憨豆特工', 'http://www.iqiyi.com/v_19rrho5k5o.html', '菜鸟特工爆笑查案', '/www/uploads/image/1543468808686v_19rrho5k5o.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '8', '2'), ('127', '红海行动', 'http://www.iqiyi.com/v_19rr7plwdc.html', '特种部队跨境救援', '/www/uploads/image/1543468808686v_19rr7plwdc.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '9', '2'), ('128', '战狼2', 'http://www.iqiyi.com/v_19rre19on4.html', '硬汉吴京搏命出击', '/www/uploads/image/1543468808686v_19rre19on4.jpg', '9', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '2', '2'), ('129', '精英部队2：大敌当前', 'http://www.iqiyi.com/v_19rr7r8i60.html', '巴西特警彪悍反腐', '/www/uploads/image/1543468808686v_19rr7r8i60.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '4', '2'), ('130', '降龙神掌苏乞儿', 'http://www.iqiyi.com/v_19rr6tth88.html', '苏乞儿误入金梅教', '/www/uploads/image/1543468808687v_19rr6tth88.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '1', '2'), ('131', '僵尸先生', 'http://www.iqiyi.com/v_19rr7r6gls.html', '林正英经典僵尸片', '/www/uploads/image/1543468808687v_19rr7r6gls.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '5', '2'), ('132', '神奇动物在哪里', 'http://www.iqiyi.com/v_19rray9p4k.html', '有只嗅嗅吃穿不愁', '/www/uploads/image/1543468808687v_19rray9p4k.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '6', '2'), ('133', '了不起的高二八班', 'http://www.iqiyi.com/v_19rr0why2g.html', '中二少年为爱拍丧尸', '/www/uploads/image/1543468808687v_19rr0why2g.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '9', '2'), ('134', '隐秘而伟大', 'http://www.iqiyi.com/v_19rrgyaris.html', '二傻子都教授卧底', '/www/uploads/image/1543468808688v_19rrgyaris.jpg', '9', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '0', '2'), ('135', '逃学威龙', 'http://www.iqiyi.com/v_19rrluld5k.html', '周星驰经典系列', '/www/uploads/image/1543468808688v_19rrluld5k.jpg', '9', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '2', '2'), ('136', '杀破狼2', 'http://www.iqiyi.com/v_19rrolm54g.html', '吴京张晋真功夫肉搏', '/www/uploads/image/1543468808690v_19rrolm54g.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '5', '2'), ('137', '快把我哥带走', 'http://www.iqiyi.com/v_19rrcgmlfg.html', '张子枫彭昱畅互怼', '/www/uploads/image/1543468808690v_19rrcgmlfg.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '9', '2'), ('138', '大嫂', 'http://www.iqiyi.com/v_19rre83m48.html', '九龙城寨玫瑰传奇', '/www/uploads/image/1543468808690v_19rre83m48.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '4', '2'), ('139', '福星高照', 'http://www.iqiyi.com/v_19rrjchoxo.html', '众巨星齐送欢乐', '/www/uploads/image/1543468808690v_19rrjchoxo.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '8', '2'), ('140', '反贪风暴3', 'http://www.iqiyi.com/v_19rrdgiq8s.html', '古天乐陷黑金迷局', '/www/uploads/image/1543468808691v_19rrdgiq8s.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '5', '2'), ('141', '神秘巨星', 'http://www.iqiyi.com/v_19rre31w14.html', '“摔爸”父女重聚', '/www/uploads/image/1543468808691v_19rre31w14.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '9', '2'), ('142', '建国大业', 'http://www.iqiyi.com/v_19rrj5vg78.html', '群星燃情献礼致敬先辈', '/www/uploads/image/1543468808691v_19rrj5vg78.jpg', '9', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '0', '2'), ('143', '一眉道人', 'http://www.iqiyi.com/v_19rr4zhc0s.html', '中国法术对付西洋僵尸', '/www/uploads/image/1543468808691v_19rr4zhc0s.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '1', '2'), ('144', '末代皇帝（上）', 'http://www.iqiyi.com/v_19rr7mmpfg.html', '奥斯卡金像奖最佳影片', '/www/uploads/image/1543468808691v_19rr7mmpfg.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '5', '2'), ('145', '唐人街探案2', 'http://www.iqiyi.com/v_19rr839kro.html', '王宝强爆笑破案', '/www/uploads/image/1543468808691v_19rr839kro.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '7', '2'), ('146', '守墓人之龙棺海昏侯', 'http://www.iqiyi.com/v_19rr6l5770.html', '海昏侯墓终极大揭秘', '/www/uploads/image/1543468808692v_19rr6l5770.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '3', '2'), ('147', '放·逐', 'http://www.iqiyi.com/v_19rrj6udbc.html', '浪漫忧伤的杜氏江湖', '/www/uploads/image/1543468808692v_19rrj6udbc.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '7', '2'), ('148', '摩天营救', 'http://www.iqiyi.com/v_19rrfawxu0.html', '巨石强森高空搏命', '/www/uploads/image/1543468808692v_19rrfawxu0.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '7', '2'), ('149', '黄金兄弟', 'http://www.iqiyi.com/v_19rr2fax3s.html', '兄弟齐聚破劫案', '/www/uploads/image/1543468808692v_19rr2fax3s.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '5', '2'), ('150', '逃学威龙2', 'http://www.iqiyi.com/v_19rrlul9b8.html', '周星驰重返校园战黑帮', '/www/uploads/image/1543468808692v_19rrlul9b8.jpg', '9', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '1', '2'), ('151', '毒战', 'http://www.iqiyi.com/v_19rrg43ha8.html', '老杜首导内地警匪题材', '/www/uploads/image/1543468808692v_19rrg43ha8.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '5', '2'), ('152', '爱情公寓', 'http://www.iqiyi.com/v_19rrdeqs18.html', '原班人马欢乐重聚', '/www/uploads/image/1543468808692v_19rrdeqs18.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '7', '2'), ('153', '逃出克隆岛', 'http://www.iqiyi.com/v_19rra8buno.html', '我可以克隆多少个女友', '/www/uploads/image/1543468808693v_19rra8buno.jpg', '8', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '7', '2'), ('154', '战狼传说', 'http://www.iqiyi.com/v_19rrmy8d0w.html', '甄子丹功夫绝杀', '/www/uploads/image/1543468808693v_19rrmy8d0w.jpg', '7', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '7', '2'), ('155', '哈利·波特1：哈利·波特与魔法石', 'http://www.iqiyi.com/v_19rrifgoyw.html', '哈利魔法旅程开篇之作', '/www/uploads/image/1543468808693v_19rrifgoyw.jpg', '9', '0', '0', '2018-11-29 13:20:36', '2018-11-29 13:20:36', '电影', '0', '2'), ('161', 'haaa', '/www/uploads/video/73cadd90-f39d-11e8-aa22-91951f73f45d.mov', 'aaa', '/www/uploads/image/73cbc7f0-f39d-11e8-aa22-91951f73f45d.jpg', '10', '1', '0', '2018-11-29 14:10:21', '2018-11-29 14:10:21', '电影', '0', '1');
COMMIT;

-- ----------------------------
--  Table structure for `preview`
-- ----------------------------
DROP TABLE IF EXISTS `preview`;
CREATE TABLE `preview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `playurl` varchar(150) DEFAULT NULL,
  `imgurl` varchar(150) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL COMMENT '1为预览状态，2未非预览状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=gbk;

-- ----------------------------
--  Records of `preview`
-- ----------------------------
BEGIN;
INSERT INTO `preview` VALUES ('1', '雪山飞狐', '雪山飞狐很好看', '/xueshanfeihu', '/www/images/big1.jpg', '1'), ('2', '雪山飞狐1', '雪山飞狐很好看1', '/xueshanfeihu1', '/www/images/big2.jpg', '1'), ('3', '雪山飞狐2', '雪山飞狐很好看2', '/xueshanfeihu2', '/www/images/big3.jpg', '1'), ('4', '雪山飞狐3', '雪山飞狐很好看3', '/xueshanfeihu3', '/www/images/big4.jpg', '1'), ('5', '雪山飞狐4', '雪山飞狐很好看4', '/xueshanfeihu4', '/www/images/big5.jpg', '1'), ('6', '雪山飞狐5', '雪山飞狐很好看5', '/xueshanfeihu5', '/www/images/big6.jpg', '1'), ('7', '雪山飞狐6', '雪山飞狐很好看6', '/xueshanfeihu6', '/www/images/big7.jpg', '1'), ('8', '雪山飞狐7', '雪山飞狐很好看7', '/xueshanfeihu7', '/www/images/big8.jpg', '1'), ('9', '雪山飞狐8', '雪山飞狐很好看8', '/xueshanfeihu8', '/www/images/big8.jpg', '0');
COMMIT;

-- ----------------------------
--  Table structure for `tvs`
-- ----------------------------
DROP TABLE IF EXISTS `tvs`;
CREATE TABLE `tvs` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `info` varchar(500) DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  `addtime` datetime NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`addtime`)
) ENGINE=InnoDB AUTO_INCREMENT=559 DEFAULT CHARSET=gbk;

-- ----------------------------
--  Records of `tvs`
-- ----------------------------
BEGIN;
INSERT INTO `tvs` VALUES ('1', '等到烟暖雨收第一季', '元气少女蜜恋冷峻公子', 'http://www.iqiyi.com/v_19rqzkkspw.html', '2018-09-11 22:07:38', '电视剧'), ('2', '娘道', '岳丽娜谱写母爱传奇', 'http://www.iqiyi.com/v_19rqzc25ao.html', '2018-09-11 22:07:38', '电视剧'), ('3', '舌害', '宋祖儿探秘娱乐圈', 'http://www.iqiyi.com/v_19rqzepgjs.html', '2018-09-11 22:07:38', '电视剧'), ('4', '为了你我愿意热爱整个世界', '罗晋郑爽相恋二十年', 'http://www.iqiyi.com/v_19rr1bx534.html', '2018-09-11 22:07:38', '电视剧'), ('5', '小棉袄', '单身酷爸斗萌娃', 'http://www.iqiyi.com/v_19rr25mfj8.html', '2018-09-11 22:07:38', '电视剧'), ('6', '爱情公寓4', '大牌客串爆笑升级', 'http://www.iqiyi.com/v_19rrgzy5ls.html', '2018-09-11 22:07:38', '电视剧'), ('7', '1006的房客', '跨越时空奇幻爱恋', 'http://www.iqiyi.com/v_19rr1l5xmw.html', '2018-09-11 22:07:38', '电视剧'), ('8', '盗墓笔记', '地下惊奇世界探秘之旅', 'http://www.iqiyi.com/v_19rrohr1jc.html', '2018-09-11 22:07:38', '电视剧'), ('9', '请回答1988', '双门洞胡同的温情故事', 'http://www.iqiyi.com/v_19rrlkh3ag.html', '2018-09-11 22:07:38', '电视剧'), ('10', '老九门', '热血收官九门同心', 'http://www.iqiyi.com/v_19rrmbr34s.html', '2018-09-11 22:07:38', '电视剧'), ('11', '卧底归来', '缉毒警察智斗毒枭', 'http://www.iqiyi.com/v_19rrax0owk.html', '2018-09-11 22:07:38', '电视剧'), ('12', '再创世纪 粤语', '金融漩涡 逆转胜负', 'http://www.iqiyi.com/v_19rqzpsrgw.html', '2018-09-11 22:07:38', '电视剧'), ('13', '幸福就好', '首部一线记者的青春剧', 'http://www.iqiyi.com/v_19rqzps8c0.html', '2018-09-11 22:07:38', '电视剧'), ('14', '灵魂摆渡', '中国恐怖故事', 'http://www.iqiyi.com/v_19rrgxmoiw.html', '2018-09-11 22:07:38', '电视剧'), ('15', '钟馗捉妖记', '杨旭文杨蓉热血捉妖', 'http://www.iqiyi.com/v_19rr0lwsfs.html', '2018-09-11 22:07:38', '电视剧'), ('16', '玄门大师', '玄门少年团拯救人间', 'http://www.iqiyi.com/v_19rrd41zjs.html', '2018-09-11 22:07:38', '电视剧'), ('17', '调香师第二季', '历劫千年复活哥哥肉身', 'http://www.iqiyi.com/v_19rqz2kbj4.html', '2018-09-11 22:07:38', '电视剧'), ('18', '太阳的后裔', '宋仲基宋慧乔定情作', 'http://www.iqiyi.com/v_19rrkxmiss.html', '2018-09-11 22:07:38', '电视剧'), ('19', '凤囚凰', '关晓彤宋威龙传奇虐恋', 'http://www.iqiyi.com/v_19rrevkcf0.html', '2018-09-11 22:07:38', '电视剧'), ('20', '灵魂摆渡2', '原班人马颤栗回归', 'http://www.iqiyi.com/v_19rrksx6gs.html', '2018-09-11 22:07:38', '电视剧'), ('21', '琅琊榜之风起长林', '琅琊风云再起', 'http://www.iqiyi.com/v_19rrf3e07c.html', '2018-09-11 22:07:38', '电视剧'), ('22', '天泪传奇之凤凰无双', '王丽坤深宫权谋', 'http://www.iqiyi.com/v_19rr8s9o0k.html', '2018-09-11 22:07:38', '电视剧'), ('23', '失宠王妃之结缘', '爱与救赎的故事', 'http://www.iqiyi.com/v_19rrfjsr6o.html', '2018-09-11 22:07:38', '电视剧'), ('24', '走火', '于毅领衔铁警打击罪案', 'http://www.iqiyi.com/v_19rr0cvkk4.html', '2018-09-11 22:07:38', '电视剧'), ('25', '杨光的快乐生活之好好先生', '逗贫杨光再次来袭', 'http://www.iqiyi.com/v_19rqz2p8og.html', '2018-09-11 22:07:38', '电视剧'), ('26', '家有儿女初长成VIP独享版', '升级版家有儿女欢乐多', 'http://www.iqiyi.com/v_19rr0n2kjo.html', '2018-09-11 22:07:38', '电视剧'), ('27', '灵魂摆渡3', '铁三角身份揭秘', 'http://www.iqiyi.com/v_19rr9evutk.html', '2018-09-11 22:07:38', '电视剧');
COMMIT;

-- ----------------------------
--  Table structure for `userlog`
-- ----------------------------
DROP TABLE IF EXISTS `userlog`;
CREATE TABLE `userlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_time` datetime DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=gbk;

-- ----------------------------
--  Records of `userlog`
-- ----------------------------
BEGIN;
INSERT INTO `userlog` VALUES ('164', '2018-11-13 23:13:51', '127.0.0.1', 'XXXX内网IP内网IP', '10'), ('165', '2018-11-13 23:52:41', '127.0.0.1', 'XXXX内网IP内网IP', '10'), ('166', '2018-11-14 00:16:14', '127.0.0.1', 'XXXX内网IP内网IP', '10'), ('167', '2018-11-16 14:47:58', '127.0.0.1', 'XXXX内网IP内网IP', '11'), ('168', '2018-11-16 14:48:35', '127.0.0.1', 'XXXX内网IP内网IP', '11'), ('169', '2018-11-16 14:58:15', '127.0.0.1', 'XXXX内网IP内网IP', '11'), ('170', '2018-11-16 15:54:30', '127.0.0.1', 'XXXX内网IP内网IP', '11'), ('171', '2018-11-16 16:00:51', '127.0.0.1', 'XXXX内网IP内网IP', '11'), ('172', '2018-11-16 16:02:17', '127.0.0.1', 'XXXX内网IP内网IP', '11'), ('173', '2018-11-16 16:04:03', '127.0.0.1', 'XXXX内网IP内网IP', '11'), ('174', '2018-11-16 16:12:56', '127.0.0.1', 'XXXX内网IP内网IP', '11'), ('175', '2018-11-16 16:13:29', '127.0.0.1', 'XXXX内网IP内网IP', '11'), ('176', '2018-11-16 17:36:14', '127.0.0.1', 'XXXX内网IP内网IP', '11'), ('177', '2018-11-20 15:00:42', '127.0.0.1', 'XXXX内网IP内网IP', '11'), ('178', '2018-11-21 14:01:32', '127.0.0.1', 'XXXX内网IP内网IP', '13'), ('179', '2018-11-21 14:10:21', '127.0.0.1', 'XXXX内网IP内网IP', '13'), ('180', '2018-11-21 14:14:25', '127.0.0.1', 'XXXX内网IP内网IP', '13'), ('181', '2018-11-21 14:26:29', '127.0.0.1', 'XXXX内网IP内网IP', '13'), ('182', '2018-11-21 14:26:27', '127.0.0.1', 'XXXX内网IP内网IP', '13'), ('183', '2018-11-21 14:43:48', '127.0.0.1', 'XXXX内网IP内网IP', '13'), ('184', '2018-11-21 15:01:21', '127.0.0.1', 'XXXX内网IP内网IP', '13'), ('185', '2018-11-21 15:01:20', '127.0.0.1', 'XXXX内网IP内网IP', '13'), ('186', '2018-11-27 16:29:50', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('187', '2018-11-27 16:31:59', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('188', '2018-11-27 16:34:09', '127.0.0.1', '未知地址', '17'), ('189', '2018-11-27 16:34:10', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('190', '2018-11-27 16:34:11', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('191', '2018-11-27 16:34:11', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('192', '2018-11-27 18:03:18', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('193', '2018-11-27 18:07:19', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('194', '2018-11-27 18:08:42', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('195', '2018-11-27 18:11:12', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('196', '2018-11-27 21:26:21', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('197', '2018-11-27 21:26:18', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('198', '2018-11-27 21:26:19', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('199', '2018-11-27 21:30:44', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('200', '2018-11-27 21:30:41', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('201', '2018-11-27 21:40:37', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('202', '2018-11-27 22:29:32', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('203', '2018-11-27 22:29:28', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('204', '2018-11-27 22:29:30', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('205', '2018-11-27 22:32:09', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('206', '2018-11-27 22:32:07', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('207', '2018-11-27 22:32:03', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('208', '2018-11-27 22:32:06', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('209', '2018-11-28 09:47:38', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('210', '2018-11-28 10:33:52', '127.0.0.1', '未知地址', '17'), ('211', '2018-11-28 10:35:51', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('212', '2018-11-28 10:35:50', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('213', '2018-11-28 12:01:30', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('214', '2018-11-28 13:22:16', '127.0.0.1', '未知地址', '17'), ('215', '2018-11-28 13:29:16', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('216', '2018-11-28 14:21:58', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('217', '2018-11-28 14:23:57', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('218', '2018-11-28 14:25:50', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('219', '2018-11-28 14:33:12', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('220', '2018-11-28 14:45:56', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('221', '2018-11-28 14:51:07', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('222', '2018-11-28 14:55:18', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('223', '2018-11-28 14:55:16', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('224', '2018-11-28 14:59:40', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('225', '2018-11-28 15:07:25', '127.0.0.1', 'XXXX内网IP内网IP', '17'), ('226', '2018-11-28 15:10:13', '127.0.0.1', 'XXXX内网IP内网IP', '17');
COMMIT;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(50) DEFAULT NULL,
  `pwd` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `info` varchar(100) DEFAULT NULL,
  `face` varchar(100) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=gbk;

-- ----------------------------
--  Records of `users`
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('10', 'jiangyan33', '45353aa4181f2970b48084f4419a4a95', '1720319534@qq.com', '17760745090', '初来乍到，请多多关照哈！', '/www/images/userlogo.gif', '2018-11-13 17:27:19'), ('11', 'loveme', 'a525b04edcb8eb3b15716b2e27f14c12', '1720319534@qq.com', '17760745092', '初来乍到，请多ss', '/www/uploads/avatar/upload_2cedf4790520c3f91debca38f683a2cf.jpg', '2018-11-16 14:45:22'), ('13', 'admin', '45353aa4181f2970b48084f4419a4a95', '1720319534@qq.com', '17760745090', '初来乍到，请多多关照哈！', '/www/images/userlogo.gif', '2018-11-21 13:28:39'), ('17', '测试用户1', '1172e9cdade27fa1ea4e858b65607939', '1720319531@qq.com', '17760745097', '初来乍到，请多多关照哈！aaaaa', '/www/uploads/avatar/45462da0-f251-11e8-9ae1-9bd3d93521fd.jpg', '2018-11-27 16:21:54');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
