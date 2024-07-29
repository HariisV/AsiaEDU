-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `noWA` VARCHAR(191) NULL,
    `jenisKelamin` ENUM('L', 'P') NOT NULL DEFAULT 'L',
    `password` VARCHAR(191) NOT NULL,
    `gambar` VARCHAR(191) NULL DEFAULT 'public/DEFAULT_USER.png',
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `verifyAt` DATETIME(3) NULL,
    `jwtVersion` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HomeSection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `bintang` INTEGER NULL,
    `pekerjaan` VARCHAR(191) NULL,
    `keterangan` TEXT NULL,
    `url` VARCHAR(191) NULL,
    `gambar` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `tipe` ENUM('BANNER', 'REVIEW', 'CUSTOM') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotificationUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `notificationId` INTEGER NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NULL,
    `status` ENUM('PAYMENT_PENDING', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'BIMBEL_CHANGES') NULL,
    `type` ENUM('SYSTEM', 'USER') NOT NULL DEFAULT 'SYSTEM',
    `keterangan` TEXT NULL,
    `url` VARCHAR(191) NULL,

    INDEX `NotificationUser_notificationId_fkey`(`notificationId`),
    INDEX `NotificationUser_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NotificationUser` ADD CONSTRAINT `NotificationUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
