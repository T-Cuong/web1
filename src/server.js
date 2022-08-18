import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
//import connection from './configs/connectDB';

require('dotenv').config();//phai co cau nay thi process.env.port moi ko loi

const app = express();
// muon chay duoc cau lenh process.env.port thi chay package npm install --save-exact dotenv@10.0.0 || 8080 la backup trong truong hop khong nhan duoc port trong env
const port = process.env.PORT || 3000;

//viet mideware theo thu tu ko dc viet lung tung 
//hai cau lenh duoi ho tro viec gui data tu client len server
app.use(express.urlencoded({ extended: true}));
//de chuyen du lieu sang kieu json 
app.use(express.json());
//setup view engine
configViewEngine(app);

//init api route
initWebRoute(app);

// init api route
initAPIRoute(app);

//handle 404 not found
//khi ta yeu cau mot duong link no se quet het dong link trong web.js neu ko thay thi no se chay xuong code duoi va hien 404
app.use((req, res) => {
    return res.render('404.ejs')
})
app.listen(port, () => {
    console.log(`listen http://localhost:${port}`)
})