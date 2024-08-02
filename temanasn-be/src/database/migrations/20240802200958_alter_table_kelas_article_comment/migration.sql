-- AddForeignKey
ALTER TABLE `KelasArticleComment` ADD CONSTRAINT `KelasArticleComment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
