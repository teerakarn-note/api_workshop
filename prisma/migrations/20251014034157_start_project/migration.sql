/*
  Warnings:

  - You are about to drop the column `customer_Address` on the `BillSale` table. All the data in the column will be lost.
  - You are about to drop the column `customer_Name` on the `BillSale` table. All the data in the column will be lost.
  - You are about to drop the column `customer_Phone` on the `BillSale` table. All the data in the column will be lost.
  - Added the required column `customer` to the `BillSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_address` to the `BillSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_phone` to the `BillSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BillSale" DROP COLUMN "customer_Address",
DROP COLUMN "customer_Name",
DROP COLUMN "customer_Phone",
ADD COLUMN     "customer" TEXT NOT NULL,
ADD COLUMN     "customer_address" TEXT NOT NULL,
ADD COLUMN     "customer_phone" TEXT NOT NULL;
