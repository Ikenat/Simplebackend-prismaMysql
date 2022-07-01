/*
  Warnings:

  - You are about to alter the column `downvote` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `upvote` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - Added the required column `note` to the `Mangas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` MODIFY `downvote` INTEGER NOT NULL DEFAULT 0,
    MODIFY `upvote` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `mangas` ADD COLUMN `note` DECIMAL(65, 30) NOT NULL;
