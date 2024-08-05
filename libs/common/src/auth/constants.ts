/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-19 17:22:52
 * @LastEditors: laikt
 * @LastEditTime: 2024-08-05 17:10:18
 */
export const jwtConstants = {
  // secret: '1111111' || process.env.JWT_SECRET, // 秘钥
  secret: '1111111', // 秘钥
};

console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);
export const roleConstans = {
  SUPER_ADMIN: 0, // 超级管理员
  ADMIN: 1, // 管理员
  DEVELOPER: 2, // 开发者（测试、运营具有同一权限，若提升为 RBAC 1 以上，则可酌情分开）
  HUMAN: 3, // 普通用户
};
