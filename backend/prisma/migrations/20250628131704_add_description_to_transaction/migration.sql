/*
  Warnings:

  - You are about to drop the column `memo` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "memo",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
