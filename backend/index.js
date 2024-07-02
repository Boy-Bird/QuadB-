const express = require("express");
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = express();

const PORT = 8000;

var corsOptions = {
  origin: "http://localhost:8000"
};

// app.use(cors(corsOptions));
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'hodlinfo',
});
db.connect(function(err) {
  if (err) throw err;
  console.log("MYSQL DB Connected!");
});

app.get("/", async (req, res) => {
  var sql = 'truncate table stocks';
  db.query(sql, (err, result) => {
    if(err) throw err;
  })
  // function fetchStock(){
  //   fetch("https://api.wazirx.com/api/v2/tickers")
  //   .then(res => res.json())
  //   .then((data) => {
  //     data = Object.entries(data).slice(0,10)
  //     arr = data;
  //     res.json(data)
  //   })
  //   .catch((error) => console.log("Error:", error));
  // }
  let arr = [];
  await fetch("https://api.wazirx.com/api/v2/tickers")
    .then(res => res.json())
    .then((data) => {
      data = Object.entries(data).slice(0,10);
      arr = data;
      res.json(data);
    })
    .catch((err) => console.log("Error:",err));


  arr.map(element => {
    var sql = `INSERT INTO stocks(name, last, buy, sell, volume, base_unit) values ( "${element[1]['name']}", ${element[1]['last']}, ${element[1]['buy']}, ${element[1]['sell']},${element[1]['volume']}, "${element[1]['base_unit']}" )`;
    db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(JSON.stringify(result));
    });
  })
})

app.get('/stock', (req, res) => {
  const sql = "SELECT * FROM stocks";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    res.json(data);
  })
})

app.listen(8000, () => console.log(`Connected on port ${PORT}`));
