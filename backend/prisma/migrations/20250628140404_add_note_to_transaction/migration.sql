/*
  Warnings:

  - You are about to drop the column `description` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "description",
ADD COLUMN     "note" TEXT;
