/*
  Warnings:

  - You are about to drop the column `publieurId` on the `commentaire` table. All the data in the column will be lost.
  - Added the required column `commentateurId` to the `Commentaire` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `commentaire` DROP FOREIGN KEY `Commentaire_publieurId_fkey`;

-- AlterTable
ALTER TABLE `commentaire` DROP COLUMN `publieurId`,
    ADD COLUMN `commentateurId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_commentateurId_fkey` FOREIGN KEY (`commentateurId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
