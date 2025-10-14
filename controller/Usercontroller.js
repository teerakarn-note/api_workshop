const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { error } = require('console');
dotenv.config();

function checkSingIn(req, res ,next){
    try{
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers['authorization'];
        const result = jwt.verify(token,secret);
        if(result != undefined){
            next();
        }
    }
    catch(e){
        res.status(500).send({error: e.message});
    }
}

function getUserId(req,res){
    // token คือข้อมูลที่ถูกส่งมาจาก client เพื่อยืนยันตัวตนของ user
    // ถอดรหัส token เพื่อดึง id ของ user
    // ถ้า token ไม่ถูกต้องจะเกิด error
    // ถ้า token ถูกต้องจะได้ id ของ user ที่ login เข้ามา
    // ถ้า token ไม่ถูกต้องจะเกิด error
    try{
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers['authorization'];
        const result = jwt.verify(token,secret);
        // ถอดรหัส ออกมาข้อมูลอยู่ใน result
        // ถ้า result ไม่ใช่ undefined แสดงว่า token ถูกต้อง
        // ถ้า result เป็น undefined แสดงว่า token ไม่ถูกต้อง
        if(result != undefined){
            return result.id;
        }
    }catch(e){
        res.status(500).send({error:e.message});
    }
}

// function checkSingIn(req, res, next) {
//     try {
//         const secret = process.env.TOKEN_SECRET;
//         const token = req.headers['authorization'];
//         const result = jwt.verify(token, secret);
//         if (result != undefined) {
//             next();
//         }
//     } catch (e) {
//         res.status(500).send({ error: e.message });
//     }
// }
// function getUserId(req, res) {
//     try {
//         const secret = process.env.TOKEN_SECRET;
//         const token = req.headers['authorization'];
//         const result = jwt.verify(token, secret);
//         if (result != undefined) {
//             return result.id;
//         }
//     } catch (e) {
//         res.status(500).send({ error: e.message });
//     }
// }

app.post('/signIn', async (req, res) => {
    try {
        if (req.body.user == undefined || req.body.pass == undefined) {
            return res.status(401).send('unauthorized');
        }
        //เมื่อ user ไม่ได้กรอก username password ไม่ให้เล่นกับ database
        const user = await prisma.user.findFirst({
            select: {
                id: true,
                name: true
            },
            where: {
                user: req.body.user,
                pass: req.body.pass,
                status: 'use'
            }
        });
        if (user != null) {
            const secret = process.env.TOKEN_SECRET;
            const token = jwt.sign(user, secret, { expiresIn: '30d' });
            return res.send({ token: token });
        }
        res.status(401).send({ message: 'unauthorized' })
    }
    catch (e) {
        res.status(500).send({ error: e.message })
    }
})
app.get('/info', checkSingIn, async(req,res,next)=>{
    try{
        const userId = getUserId(req,res);
        const user = await prisma.user.findFirst({
            select:{
                name: true
            },
            where:{
                id: userId
            }
        })
        res.send({result: user});
    }catch(e){
        res.status(500).send({error:e.message});
    }
})
module.exports = app;