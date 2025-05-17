/*
  Warnings:

  - You are about to drop the column `description` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Card` table. All the data in the column will be lost.
  - Added the required column `task` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "task" TEXT NOT NULL,
ALTER COLUMN "position" SET DEFAULT 0,
ALTER COLUMN "position" DROP DEFAULT;
DROP SEQUENCE "card_position_seq";
