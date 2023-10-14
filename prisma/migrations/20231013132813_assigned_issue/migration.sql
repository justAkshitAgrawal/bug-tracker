-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assinedToUsedId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assinedToUsedId_fkey` FOREIGN KEY (`assinedToUsedId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
