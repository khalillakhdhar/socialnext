/*
  Warnings:

  - You are about to drop the column `commentateurId` on the `commentaire` table. All the data in the column will be lost.
  - Added the required column `publieurId` to the `Commentaire` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `commentaire` DROP FOREIGN KEY `Commentaire_commentateurId_fkey`;

-- AlterTable
ALTER TABLE `commentaire` DROP COLUMN `commentateurId`,
    ADD COLUMN `publieurId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_publieurId_fkey` FOREIGN KEY (`publieurId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
