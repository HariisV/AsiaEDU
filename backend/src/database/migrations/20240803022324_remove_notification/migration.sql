/*
  Warnings:

  - You are about to drop the `notificationuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `notificationuser` DROP FOREIGN KEY `NotificationUser_userId_fkey`;

-- DropTable
DROP TABLE `notificationuser`;
