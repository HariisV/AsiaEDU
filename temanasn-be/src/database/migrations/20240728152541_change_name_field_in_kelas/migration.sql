/*
  Warnings:

  - You are about to drop the column `namaKelas` on the `kelas` table. All the data in the column will be lost.
  - Added the required column `name` to the `Kelas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kelas` DROP COLUMN `namaKelas`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
