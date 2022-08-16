import express from "express";
import homeController from '../controller/homeController';
//express co 1 ham goi la router goi nhu nay se biet ta dang khai bao mot duogn link tren web 
let router = express.Router();

const initWebRoute = (app) => {
    // ta dang truyen tham so vao
    router.get('/',homeController.getHomepage);
    //:userId de lay tham so thay doi tren duong link url ta dung :va dat ten
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user',homeController.createNewUser);   
    router.post('/delete-user', homeController.deleteUser); 
    router.get('/edit-user/:id', homeController.getEditPage);
     router.post('/update-user', homeController.postUpdateUser);
     
    //express se hieu web bat dau bang dau /
    return app.use('/', router)
}
export default initWebRoute;