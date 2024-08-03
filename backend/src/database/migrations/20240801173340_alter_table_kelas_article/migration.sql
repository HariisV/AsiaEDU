/*
  Warnings:

  - Added the required column `title` to the `KelasArticle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kelasarticle` ADD COLUMN `title` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `KelasArticle` ADD CONSTRAINT `KelasArticle_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KelasArticleMedia` ADD CONSTRAINT `KelasArticleMedia_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `KelasArticle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KelasArticleComment` ADD CONSTRAINT `KelasArticleComment_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `KelasArticle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KelasArticleLike` ADD CONSTRAINT `KelasArticleLike_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `KelasArticle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
