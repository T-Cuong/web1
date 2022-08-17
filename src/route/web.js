import express from "express";
import homeController from '../controller/homeController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
//express co 1 ham goi la router goi nhu nay se biet ta dang khai bao mot duogn link tren web 
let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //duong dan den file
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        //tao ten unique tranh de trung lap ten
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    //quy dinh cac dinh dang dc tai len
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        //neu ko dung cac dinh dang o tren thi hien ra Only image files are allowed!
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });



const initWebRoute = (app) => {
    // ta dang truyen tham so vao
    router.get('/',homeController.getHomepage);
    //:userId de lay tham so thay doi tren duong link url ta dung :va dat ten
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user',homeController.createNewUser);   
    router.post('/delete-user', homeController.deleteUser); 
    router.get('/edit-user/:id', homeController.getEditPage);
     router.post('/update-user', homeController.postUpdateUser);
     router.get('/upload', homeController.getUploadFilePage);
    //express se hieu web bat dau bang dau /
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)
    return app.use('/', router)
}
export default initWebRoute;