/*
  Warnings:

  - You are about to drop the column `BillSaleId` on the `BillSaleDetail` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `BillSaleDetail` table. All the data in the column will be lost.
  - Added the required column `billSale_Id` to the `BillSaleDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_Id` to the `BillSaleDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."BillSaleDetail" DROP CONSTRAINT "BillSaleDetail_BillSaleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BillSaleDetail" DROP CONSTRAINT "BillSaleDetail_productId_fkey";

-- AlterTable
ALTER TABLE "public"."BillSaleDetail" DROP COLUMN "BillSaleId",
DROP COLUMN "productId",
ADD COLUMN     "billSale_Id" INTEGER NOT NULL,
ADD COLUMN     "product_Id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."BillSaleDetail" ADD CONSTRAINT "BillSaleDetail_product_Id_fkey" FOREIGN KEY ("product_Id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BillSaleDetail" ADD CONSTRAINT "BillSaleDetail_billSale_Id_fkey" FOREIGN KEY ("billSale_Id") REFERENCES "public"."BillSale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
