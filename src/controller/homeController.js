import pool from '../configs/connectDB';
import multer from 'multer';


let getHomepage =async (req, res) => {
    //logic
    // simple query
//let data = [];//tao mot bien data 

//thuc hien ket noi den db 
// connection.query(
//     'SELECT * FROM `users` ',
//     function(err, results, fields) {
     
//       //gan data = 2 id vua tao trong phpdamin
//         results.map((row) => {data.push({
//           id: row.id,
//           email: row.email,
//           address: row.address,
//           firstName: row.firstName,
//           lastName: row.lastName
//         })});
//      // return res.render('index.ejs', {dataUser: data})  //{dataUser: JSON.stringify(data)})  de truyen quq view JSON.stringify de chuyen tu kieu object sang string
// //kieu du lieu cua dataUser la mang
//     }) 
//destructuringjs
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');//cau lenh await tra ra hai phan tu rows và fields
    return res.render('index.ejs', {dataUser: rows, test:'abc tring test'})  //{dataUser: JSON.stringify(data)})
  

}
let getDetailPage = async(req,res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select * from users where id =  ?`, [userId]);
    //res.params.id o day .id vi ben web.js  router.get('/detail/user/:id', homeController.getDetailPage)

    return res.send(JSON.stringify(user)) 
}

// let createNewUser = async(req,res) => {
//     //req.body #12  
//     console.log('check req:', req.body)
//     //destructuring de lay ra cac tham so gui len
    
//     //let firstName = req.body.firstName;
//     //let lastName = req.body.lastName;
//     //let email = req.body.email;
//     //let address = req.body.address;code duoi tuong ung voi 4 cau lenh tren
//     let {firstName, lastName, email, address} = req.body; 

//     //chung ta co 4 gia tri firstName, lastName, email, address nen ta co 4 dau ? , trong [] la cac tham so chung ta muon dien vao dau ?
//     await pool.execute('insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)',[firstName, lastName, email, address]);
//     return res.send('call post create new user ')
// }
let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
        [firstName, lastName, email, address]);
        //nay la tra ve trang home
    return res.redirect('/')
}

let deleteUser = async(req, res) =>{
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId])
    return res.redirect('/');
}

let getEditPage = async(req,res) => {
    let id = req.params.id;
    //phai co [user] thay vi let user vi no tra ve mot mang hai phan tu da duoc khai bao o code const [rows, fields] = await pool.execute('SELECT * FROM `users`')
    let [user] = await pool.execute('Select * from users where id = ?', [id]);
    return res.render('update.ejs',{dataUser: user[0]});//user[0] boi vi  const [rows, fields] = await pool.execute('SELECT * FROM `users`'); tra ra hai tham so va ta lay tham so rows
}

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;

    await pool.execute('update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
        [firstName, lastName, email, address, id]);

    return res.redirect('/');
}


let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}


//ta da khai bao hai midleware ben web.js la     router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile); va router.post('/upload-multiple-images',upload.array('multiple_images', 3),homeController.handleUploadMultipleFiles)
//thi o request khi vao den controller cuar chung ta thi no da them du lieu vao server nen hai doan code phia duoi la thua vi sau khi khai bao upload.single('profile_pic') va upload.array('multiple_images', 3) 
// const upload = multer().single('profile.pic');//khai bao upload de biet dang dung multer va se cho no biet mot cai ten boi vi khi xu ly request no can mot cai ten de lay ra file
// const uploadMultiple = multer().array('multiple_images', 3);

let handleUploadFile = async (req, res) => {
    //console.log(req.file)
    //upload(req, res, function (err){
    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    // else if (err instanceof multer.MulterError){
    //     return res.send(err);
    // }
    // else if(err){
    //     return res.send(err);
    // }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
     //});
}

let handleUploadMultipleFiles = async (req, res) => {

    
        if (req.fileValidationError) {

            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
    
    

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);

}
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser,getEditPage, postUpdateUser, getUploadFilePage, handleUploadFile, handleUploadMultipleFiles
}