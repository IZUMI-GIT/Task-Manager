/*
  Warnings:

  - A unique constraint covering the columns `[listId,position]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[boardId,position]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Card_position_key";

-- DropIndex
DROP INDEX "List_position_key";

-- CreateIndex
CREATE UNIQUE INDEX "Card_listId_position_key" ON "Card"("listId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "List_boardId_position_key" ON "List"("boardId", "position");
