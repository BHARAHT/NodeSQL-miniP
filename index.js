const express=require('express');
const mysql = require('mysql2');
const app=express();
const port=3000;
const { faker } = require('@faker-js/faker');
const path =require('path');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));

const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'user'
});

app.get('/users',(req,res)=>{

    let q=`select * from users`;
    connection.query(q,(err,results)=>{
            if(err) throw err;
            res.render('users',{users:results});
    });
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});