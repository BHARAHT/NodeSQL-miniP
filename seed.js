const mysql = require('mysql2');
const { faker } = require('@faker-js/faker');
const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'user'
});


function createFakeUser() {
  return [
    faker.person.fullName(),
    faker.internet.email(),
    faker.number.int({ min: 18, max: 65 }),
    faker.location.country()
  ];
}

let cusers=[];
for (let i = 0; i < 100; i++) {
    cusers.push(createFakeUser());
}

let q=`insert into users (name,email,age,country) values ?`;
connection.query(q,[cusers],(err,results)=>{
    if(err) {
        console.error('Error inserting data:', err);
    } else {
        console.log('Data inserted successfully:', results.affectedRows);
    }
    connection.end();
})