const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const { error } = require('console');
const exceljs = require('exceljs');


dotenv.config();

// อัพโหลดไฟล์
app.use(fileUpload());

app.post('/create', async (req, res, next) => {
    try {
        // เพิ่มข้อความ
        await prisma.product.create({
            data: req.body
        });
        res.send({ message: 'success' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});
app.get('/list', async (req, res) => {
    try {
        const data = await prisma.product.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                status: 'use'
            }
        })
        res.send({ result: data });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})
app.delete('/remove/:id', async (req, res) => {
    try {
        await prisma.product.update({
            data: {
                status: 'delete'
            },
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.send({ message: 'success' });
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
})
app.put('/update/', async (req, res) => {
    try {
        const fs = require('fs');
        const oldData = await prisma.product.findFirst({
            where: {
                id: parseInt(req.body.id)
            }
        });

        const imagePath = './uploads/' + oldData.img;
        if (oldData.img != "") {
            if (fs.existsSync(imagePath)) {
                await fs.unlinkSync(imagePath);
            }
        }

        await prisma.product.update({
            data: req.body,
            where: {
                id: parseInt(req.body.id)
            }
        });
        res.send({ message: 'success' });

    } catch (e) {
        res.status(500).send({ error: e.message });
    }

});
app.post('/upload', async (req, res) => {
    try {
        if (req.files != undefined) {
            if (req.files.img != undefined) {
                const img = req.files.img;
                const fs = require('fs');

                const myDate = new Date();
                const y = myDate.getFullYear();
                const m = myDate.getMonth() + 1;
                const d = myDate.getDate();
                const h = myDate.getHours();
                const mi = myDate.getMinutes();
                const s = myDate.getSeconds();
                const ms = myDate.getMilliseconds();

                const arrFilename = img.name.split('.');
                const ext = arrFilename[arrFilename.length - 1];
                const newName = `${y}${m}${d}${h}${mi}${s}${ms}.${ext}`;
                img.mv('./uploads/' + newName, (error) => {
                    if (error) throw err;
                    res.send({ newName: newName });
                })
            }
        } else {
            res.status(501).send('notimplemented');
        }
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})
app.post('/uploadFromExcel', (req, res) => {
    try {
        const fileExcel = req.files.fileExcel;
        fileExcel.mv('./uploads/' + fileExcel.name, async (err) => {
            if (err) throw err;

            const workbook = new exceljs.Workbook();
            await workbook.xlsx.readFile('./uploads/' + fileExcel.name);
            const ws = workbook.getWorksheet(1);

            // อ่านข้อมูลจาก excel ตั้งแต่แถวที่ 2 เป็นต้นไปเพราะแถวที่ 1 filld
            for (let i = 2; i <= ws.rowCount; i++) {
                const name = ws.getRow(i).getCell(1).value ?? ""; //if null of undefined return ""
                const cost = ws.getRow(i).getCell(2).value ?? 0; // if null of undefined return 0
                const price = ws.getRow(i).getCell(3).value ?? 0; // if null of undefined return 0

                // insert ข้อมูลลง database
                if (name != "" && cost >= 0 && price >= 0) {
                    await prisma.product.create({
                        data: {
                            name: name,
                            cost: cost,
                            price: price,
                            img: ''
                        }
                    })
                }

            }
            // remove file from server
            const fs = require('fs');
            await fs.unlinkSync('./uploads/' + fileExcel.name);

            res.send({ message: 'success' });
        })
    }
    catch (e) {
        res.status(500).send({ error: e.message });

    }

})
module.exports = app;