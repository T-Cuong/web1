import connection from '../configs/connectDB';

let getHomepage = (req, res) => {
    //logic
    // simple query
let data = [];//tao mot bien data 

//thuc hien ket noi den db 
connection.query(
    'SELECT * FROM `users` ',
    function(err, results, fields) {
     
      //gan data = 2 id vua tao trong phpdamin
        results.map((row) => {data.push({
          id: row.id,
          email: row.email,
          address: row.address,
          firstName: row.firstName,
          lastName: row.lastName
        })});
      return res.render('index.ejs', {dataUser: data})  //{dataUser: JSON.stringify(data)})  de truyen quq view JSON.stringify de chuyen tu kieu object sang string
//kieu du lieu cua dataUser la mang
    }) 

    
}
module.exports = {
    getHomepage
}