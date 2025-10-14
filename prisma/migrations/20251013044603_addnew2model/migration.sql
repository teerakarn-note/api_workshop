-- CreateTable
CREATE TABLE "public"."BillSale" (
    "id" SERIAL NOT NULL,
    "customer" TEXT NOT NULL,
    "customer_phone" TEXT NOT NULL,
    "customer_address" TEXT NOT NULL,
    "payDate" TIMESTAMP(3) NOT NULL,
    "payTime" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'wait',

    CONSTRAINT "BillSale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BillSaleDetail" (
    "id" SERIAL NOT NULL,
    "product_Id" INTEGER NOT NULL,
    "BillSale_Id" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "BillSaleDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."BillSaleDetail" ADD CONSTRAINT "BillSaleDetail_product_Id_fkey" FOREIGN KEY ("product_Id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BillSaleDetail" ADD CONSTRAINT "BillSaleDetail_BillSale_Id_fkey" FOREIGN KEY ("BillSale_Id") REFERENCES "public"."BillSale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
