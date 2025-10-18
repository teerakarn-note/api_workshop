const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const userController = require('./controller/Usercontroller');
const req = require('express/lib/request');
const productController = require('./controller/ProductController');
const saleController = require('./controller/SaleController');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/user', userController);
app.use('/product', productController);
app.use('/api/sale', saleController);

app.listen(3001);