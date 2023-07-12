/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - Added the required column `hash` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "password",
ADD COLUMN     "hash" VARCHAR(64) NOT NULL,
ADD COLUMN     "salt" VARCHAR(64) NOT NULL;
