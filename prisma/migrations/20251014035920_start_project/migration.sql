/*
  Warnings:

  - You are about to drop the column `customerName` on the `BillSale` table. All the data in the column will be lost.
  - Added the required column `customer` to the `BillSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BillSale" DROP COLUMN "customerName",
ADD COLUMN     "customer" TEXT NOT NULL;
