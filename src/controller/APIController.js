import pool from '../configs/connectDB';
let getAllUsers = async(req, res) => {
    //200 la trang thai khi ket noi thanh cong, sau khi tra ra trang thai ta tiep tuc tra ra dang du lieu ma nguoi o client co the doc duoc la json va ban chat json la object
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })

}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    //cau lenh if de kiem tra xem nguoi dung co nhap du du lieu de tao user ko
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
    [firstName, lastName, email, address]);

    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
        [firstName, lastName, email, address, id]);

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) => {
    //lay userId
    let userId = req.params.id;
    // neu ko truyen len userId thi se bao loi
    if (!userId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('delete from users where id = ?', [userId])
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}