const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.post('/save', async (req, res) => {
    // save data ลงตาราง BillSale
    try {
        const rowBillSale = await prisma.billSale.create({
            data: {
                // filedatabase : valueฝังfontend ตัวแปรที่เก็บค่า
                customerName: req.body.customerName,
                customerPhone: req.body.customerPhone,
                customerAddress: req.body.customerAddress,
                payDate: new Date(req.body.payDate),
                payTime: req.body.payTime,
            }
        });
        for (let i = 0; i < req.body.carts.length; i++) {
            const rowProduct = await prisma.product.findFirst({
                where: {
                    id: req.body.carts[i].id
                }

            })
            await prisma.billSaleDetail.create({
                data: {
                    billSale_Id: rowBillSale.id,
                    product_Id: rowProduct.id,
                    cost: rowProduct.cost,
                    price: rowProduct.price,
                }
            });
        }

        res.send({ message: 'success', result: rowBillSale });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});
app.get('/list', async (req, res) => {
    try {
        const result = await prisma.billSale.findMany({
            orderBy: {
                id: 'desc'
            }
        })
        res.send({ result: result });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

module.exports = app;