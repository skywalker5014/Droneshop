import mysql2 from 'mysql2';

const sql = mysql2.createConnection(
    {
        database: 'droneshop',
        host: 'localhost',
        password: 'tintintin',
        user: 'root'
    }
)

export default sql;