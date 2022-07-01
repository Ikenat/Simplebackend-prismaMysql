/*
  Warnings:

  - You are about to drop the column `vote` on the `comments` table. All the data in the column will be lost.
  - Added the required column `downvote` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upvote` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `vote`,
    ADD COLUMN `downvote` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `upvote` DECIMAL(65, 30) NOT NULL,
    MODIFY `image` BLOB NULL;
