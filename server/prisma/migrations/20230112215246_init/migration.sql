/*
  Warnings:

  - You are about to drop the column `faces` on the `image` table. All the data in the column will be lost.
  - Added the required column `description` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `faces`,
    ADD COLUMN `description` VARCHAR(128) NOT NULL,
    ADD COLUMN `percentage` INTEGER NOT NULL DEFAULT 0;
