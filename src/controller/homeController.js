import pool from '../configs/connectDB';

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
module.exports = {
    getHomepage, getDetailPage, createNewUser
}