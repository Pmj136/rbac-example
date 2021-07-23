/*
 Navicat Premium Data Transfer

 Source Server         : dev
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : rbac

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 23/07/2021 13:14:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_perm
-- ----------------------------
DROP TABLE IF EXISTS `t_perm`;
CREATE TABLE `t_perm`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `str` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `parent_id` int(11) NULL DEFAULT 0,
  `sort` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_perm
-- ----------------------------
INSERT INTO `t_perm` VALUES (1, '权限管理', '/permission-manage', 'menu', 0, 1);
INSERT INTO `t_perm` VALUES (2, '权限列表', '/permission-manage/permission-list', 'menu', 1, 0);
INSERT INTO `t_perm` VALUES (3, '新增权限', 'permission:add', 'action', 2, NULL);
INSERT INTO `t_perm` VALUES (4, '删除权限', 'permission:del', 'action', 2, NULL);
INSERT INTO `t_perm` VALUES (5, '编辑权限', 'permission:edit', 'action', 2, NULL);
INSERT INTO `t_perm` VALUES (6, '查看列表', 'permission:list', 'action', 2, NULL);
INSERT INTO `t_perm` VALUES (7, '角色列表', '/permission-manage/role-list', 'menu', 1, 1);
INSERT INTO `t_perm` VALUES (8, '新增角色', 'role:add', 'action', 7, NULL);
INSERT INTO `t_perm` VALUES (9, '删除角色', 'role:del', 'action', 7, NULL);
INSERT INTO `t_perm` VALUES (10, '编辑角色', 'role:edit', 'action', 7, NULL);
INSERT INTO `t_perm` VALUES (11, '查看列表', 'role:list', 'action', 7, NULL);
INSERT INTO `t_perm` VALUES (12, '用户列表', '/permission-manage/user-list', 'menu', 1, 2);
INSERT INTO `t_perm` VALUES (13, '新增用户', 'user:add', 'action', 12, NULL);
INSERT INTO `t_perm` VALUES (14, '删除用户', 'user:del', 'action', 12, NULL);
INSERT INTO `t_perm` VALUES (15, '编辑用户', 'user:edit', 'action', 12, NULL);
INSERT INTO `t_perm` VALUES (16, '查看列表', 'user:list', 'action', 12, NULL);
INSERT INTO `t_perm` VALUES (26, '分配权限', 'role-perm:edit', 'action', 2, NULL);
INSERT INTO `t_perm` VALUES (27, '分配角色', 'user-role:edit', 'action', 12, NULL);
INSERT INTO `t_perm` VALUES (28, '首页', '/home', 'menu', 0, 0);

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_at` datetime NULL DEFAULT NULL,
  `create_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES (1, '超级管理员', '2021-07-21 20:28:42', NULL);
INSERT INTO `t_role` VALUES (2, '管理员', '2021-07-21 21:35:04', 1);
INSERT INTO `t_role` VALUES (3, '行政专员', '2021-07-22 10:35:58', 1);
INSERT INTO `t_role` VALUES (4, '业务员', '2021-07-22 10:36:23', 1);
INSERT INTO `t_role` VALUES (5, '总经理', '2021-07-22 15:37:16', 1);

-- ----------------------------
-- Table structure for t_role_perm
-- ----------------------------
DROP TABLE IF EXISTS `t_role_perm`;
CREATE TABLE `t_role_perm`  (
  `role_id` int(11) NOT NULL,
  `perm_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`, `perm_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_role_perm
-- ----------------------------
INSERT INTO `t_role_perm` VALUES (1, 1);
INSERT INTO `t_role_perm` VALUES (1, 2);
INSERT INTO `t_role_perm` VALUES (1, 3);
INSERT INTO `t_role_perm` VALUES (1, 4);
INSERT INTO `t_role_perm` VALUES (1, 5);
INSERT INTO `t_role_perm` VALUES (1, 6);
INSERT INTO `t_role_perm` VALUES (1, 7);
INSERT INTO `t_role_perm` VALUES (1, 8);
INSERT INTO `t_role_perm` VALUES (1, 9);
INSERT INTO `t_role_perm` VALUES (1, 10);
INSERT INTO `t_role_perm` VALUES (1, 11);
INSERT INTO `t_role_perm` VALUES (1, 12);
INSERT INTO `t_role_perm` VALUES (1, 13);
INSERT INTO `t_role_perm` VALUES (1, 14);
INSERT INTO `t_role_perm` VALUES (1, 15);
INSERT INTO `t_role_perm` VALUES (1, 16);
INSERT INTO `t_role_perm` VALUES (1, 26);
INSERT INTO `t_role_perm` VALUES (1, 27);
INSERT INTO `t_role_perm` VALUES (1, 28);
INSERT INTO `t_role_perm` VALUES (2, 1);
INSERT INTO `t_role_perm` VALUES (2, 2);
INSERT INTO `t_role_perm` VALUES (2, 6);
INSERT INTO `t_role_perm` VALUES (2, 7);
INSERT INTO `t_role_perm` VALUES (2, 11);
INSERT INTO `t_role_perm` VALUES (2, 12);
INSERT INTO `t_role_perm` VALUES (2, 16);
INSERT INTO `t_role_perm` VALUES (2, 28);
INSERT INTO `t_role_perm` VALUES (5, 1);
INSERT INTO `t_role_perm` VALUES (5, 12);
INSERT INTO `t_role_perm` VALUES (5, 16);
INSERT INTO `t_role_perm` VALUES (5, 28);

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_at` datetime NULL DEFAULT NULL,
  `available` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (1, 'admin', 'adf6d232eba919f3f4724c5d77f932ee', '2021-07-21 07:02:08', 1);
INSERT INTO `t_user` VALUES (2, 'lwy', 'adf6d232eba919f3f4724c5d77f932ee', '2021-07-21 09:56:16', 1);

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role`  (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
INSERT INTO `t_user_role` VALUES (1, 1);
INSERT INTO `t_user_role` VALUES (2, 2);

SET FOREIGN_KEY_CHECKS = 1;
