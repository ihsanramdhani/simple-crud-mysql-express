import express from 'express';
import mysql from 'mysql2';

const port = '8080';
let secretToken;

// connect to db
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'auth_ihsan',
});

const promisePool = pool.promise();

// create endpoints
const app = express();

// parse request as JSON
app.use(express.json());

// health check
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [rows, _] = await promisePool.query(
    'SELECT * FROM `users` WHERE `email`=?',
    [email]
  );

  if (rows.length === 0)
    res.json({
      status: 404,
      Message: 'Data Not Found',
    });

  secretToken = Math.trunc(Math.random() * 100 + 1);
  res.json({
    status: 200,
    secretToken: secretToken,
  });
});

// get users data

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
