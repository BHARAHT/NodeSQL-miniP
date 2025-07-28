//run sql in terminal cmd
// & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
const express=require('express');
const mysql = require('mysql2');
const app=express();
const port=3000;
const { faker } = require('@faker-js/faker');
const path =require('path');
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// Create a connection to the database
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

app.get('/users/new',(req,res)=>{
    res.render('new');
});

app.post('/users',(req,res)=>{
    const {name,email,age,country}=req.body;
    let q=`insert into users (name,email,age,country) values (?,?,?,?)`;
connection.query(q,[name,email,age,country],(err,result)=>{
    if(err) throw err;
    res.redirect('/users');

});
});
app.get('/users/:id',(req,res)=>{
    const {id}=req.params;
    let q=`select * from users where id=?`;
    connection.query(q,[id],(err,result)=>{
        if(err) throw err;
        res.render('show',{user:result[0]});
    });

});
app.get('/users/:id/edit',(req,res)=>{
    const {id}=req.params;
    let q=`select * from users where id=?`;
    connection.query(q,[id],(err,result)=>{
        if(err) throw err;
        res.render('edit',{user:result[0]});
    });
});

//update 
app.put('/users/:id',(req,res)=>{
    const {id}=req.params;
    const {name,email,age,country}=req.body;
    let q=`update users set name=?,email=?,age=?,country=? where id=?`;
    connection.query(q,[name,email,age,country,id],(err,result)=>{
        if(err) throw err;
        res.redirect(`/users/${id}`);
    });
});