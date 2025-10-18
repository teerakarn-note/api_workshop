/*
  Warnings:

  - You are about to drop the column `customer` on the `BillSale` table. All the data in the column will be lost.
  - You are about to drop the column `customer_address` on the `BillSale` table. All the data in the column will be lost.
  - You are about to drop the column `customer_phone` on the `BillSale` table. All the data in the column will be lost.
  - Added the required column `customerAddress` to the `BillSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `BillSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `BillSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BillSale" DROP COLUMN "customer",
DROP COLUMN "customer_address",
DROP COLUMN "customer_phone",
ADD COLUMN     "customerAddress" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL;
