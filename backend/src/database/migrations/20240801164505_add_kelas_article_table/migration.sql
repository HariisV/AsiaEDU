/*
  Warnings:

  - You are about to drop the column `jenisKelamin` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `jenisKelamin`;

-- CreateTable
CREATE TABLE `KelasArticle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `kelasId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `isApprove` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `KelasArticle_kelasId_fkey`(`kelasId`),
    INDEX `KelasArticle_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KelasArticleMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `articleId` INTEGER NOT NULL,
    `type` ENUM('IMAGE', 'VIDEO', 'DOCUMENT') NOT NULL DEFAULT 'IMAGE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `KelasArticleMedia_articleId_fkey`(`articleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KelasArticleComment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,
    `comment` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `KelasArticleComment_articleId_fkey`(`articleId`),
    INDEX `KelasArticleComment_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KelasArticleLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,
    `isLike` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `KelasArticleLike_articleId_fkey`(`articleId`),
    INDEX `KelasArticleLike_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
