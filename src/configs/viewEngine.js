import express from 'express';

const configViewEngine = (app) =>{
    //quy dinh express su dung public noi chun ta co the truy cap cac file static 
    app.use(express.static('./src/public'))
    //cau hinh view engine là ejs 
    app.set("view engine", "ejs");
    //cho express file ejs ở đâu 
    app.set("views", "./src/views")
}

export default configViewEngine;