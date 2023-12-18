/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-12-18 11:21:46
 * @LastEditors: laikt
 * @LastEditTime: 2023-12-18 11:36:55
 */
module.exports = {
  apps: [
    {
      name: 'shop-app',
      script: './dist/apps/shop-app/main.js',
      env: {
        NODE_ENV: 'production',
        JWT_SECRET: 'mysecret',
      },
    },
  ],
};
