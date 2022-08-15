import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
//import connection from './configs/connectDB';

require('dotenv').config();//phai co cau nay thi process.env.port moi ko loi

const app = express();
// muon chay duoc cau lenh process.env.port thi chay package npm install --save-exact dotenv@10.0.0 || 8080 la backup trong truong hop khong nhan duoc port trong env
const port = process.env.PORT || 3000;

//hai cau lenh duoi ho tro viec gui data tu client len server
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
//setup 
configViewEngine(app);
initWebRoute(app);
app.listen(port, () => {
    console.log(`listen http://localhost:${port}`)
})