/*
  Warnings:

  - You are about to drop the column `assinedToUsedId` on the `issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_assinedToUsedId_fkey`;

-- AlterTable
ALTER TABLE `issue` DROP COLUMN `assinedToUsedId`,
    ADD COLUMN `assinedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assinedToUserId_fkey` FOREIGN KEY (`assinedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
