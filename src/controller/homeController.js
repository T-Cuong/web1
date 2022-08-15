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
module.exports = {
    getHomepage, getDetailPage
}