/*
  Warnings:

  - You are about to drop the column `customerAddress` on the `BillSale` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `BillSale` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `BillSale` table. All the data in the column will be lost.
  - Added the required column `customer_Address` to the `BillSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_Name` to the `BillSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_Phone` to the `BillSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BillSale" DROP COLUMN "customerAddress",
DROP COLUMN "customerName",
DROP COLUMN "customerPhone",
ADD COLUMN     "customer_Address" TEXT NOT NULL,
ADD COLUMN     "customer_Name" TEXT NOT NULL,
ADD COLUMN     "customer_Phone" TEXT NOT NULL;
