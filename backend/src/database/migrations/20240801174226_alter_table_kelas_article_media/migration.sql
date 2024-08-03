/*
  Warnings:

  - Added the required column `urlFile` to the `KelasArticleMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kelasarticlemedia` ADD COLUMN `urlFile` VARCHAR(191) NOT NULL;
