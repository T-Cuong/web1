import express from "express";
import APIController from '../controller/APIController';

//express co 1 ham goi la router goi nhu nay se biet ta dang khai bao mot duogn link tren web 
let router = express.Router();

const initAPIRoute = (app) => {
    // ta dang truyen tham so vao
    router.get('/users',APIController.getAllUsers);//method GET ->Read data
    router.post('/create-user', APIController.createNewUser);//method POST -> create data(read and write)
    //ben web.js ta ko co put vs delete boi vi trong file html ta co form ma form chi co get va post video 14 phut 47:14
    router.put('/update-user', APIController.updateUser); //method PUT -> UPDATE data
    router.delete('/delete-user/:id', APIController.deleteUser); //method DELETE -> DELETE data
    return app.use('/api/v1/', router)
}
export default initAPIRoute;