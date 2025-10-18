/*
  Warnings:

  - You are about to drop the column `BillSale_Id` on the `BillSaleDetail` table. All the data in the column will be lost.
  - You are about to drop the column `product_Id` on the `BillSaleDetail` table. All the data in the column will be lost.
  - Added the required column `BillSaleId` to the `BillSaleDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `BillSaleDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."BillSaleDetail" DROP CONSTRAINT "BillSaleDetail_BillSale_Id_fkey";

-- DropForeignKey
ALTER TABLE "public"."BillSaleDetail" DROP CONSTRAINT "BillSaleDetail_product_Id_fkey";

-- AlterTable
ALTER TABLE "public"."BillSaleDetail" DROP COLUMN "BillSale_Id",
DROP COLUMN "product_Id",
ADD COLUMN     "BillSaleId" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."BillSaleDetail" ADD CONSTRAINT "BillSaleDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BillSaleDetail" ADD CONSTRAINT "BillSaleDetail_BillSaleId_fkey" FOREIGN KEY ("BillSaleId") REFERENCES "public"."BillSale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
