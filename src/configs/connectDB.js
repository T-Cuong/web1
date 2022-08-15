// get the client
import mysql from 'mysql2/promise';


// create the connection to database
//dung pool de bo qua bot xac thuc thay vi phai ket noi den db lien tuc
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'web1'
});
//const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test'});


export default pool ;
 