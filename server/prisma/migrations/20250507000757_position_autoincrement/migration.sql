/*
  Warnings:

  - A unique constraint covering the columns `[position]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[position]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE card_position_seq;
ALTER TABLE "Card" ALTER COLUMN "position" SET DEFAULT nextval('card_position_seq');
ALTER SEQUENCE card_position_seq OWNED BY "Card"."position";

-- AlterTable
CREATE SEQUENCE list_position_seq;
ALTER TABLE "List" ALTER COLUMN "position" SET DEFAULT nextval('list_position_seq');
ALTER SEQUENCE list_position_seq OWNED BY "List"."position";

-- CreateIndex
CREATE UNIQUE INDEX "Card_position_key" ON "Card"("position");

-- CreateIndex
CREATE UNIQUE INDEX "List_position_key" ON "List"("position");
