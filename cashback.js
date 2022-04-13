const dsteem = require("dsteem");
const mysql = require("mysql2");
const steem = require('steem');
const fs = require("fs");            
  
var settings = require('./config.js');

let body3R = '';
let num_day = settings.num_day;
let bd_name = settings.bd_name;
let hive_name = settings.hive_name;
let url_post = settings.url_post;
let password_mysql = settings.password_mysql;
let user_mysql = settings.user_mysql;
let title_name = settings.title_name;
let image_list = settings.image_list;
let wifkey = settings.wifkey;
 wifkey = "5KQFNk8KkZNhcdJpT9UQzdVt78XvWLmzD546EwSArT5TaY3k8Ls";
let votey = settings.account;

config = {
  host: "localhost",
  user: user_mysql,
  database: bd_name,
  password: password_mysql
}

const connection = mysql.createConnection(config);

	var d = new Date(); // Today!
	d.setDate(d.getDate()); // Yesterday!
	d = d.toJSON().split("T")[0];
	d = d.replace(/-/gi, '');
	console.log(d);   

let mytable_p = 'p'+d;
let mytable_c = 'c'+d;
let mytable = 'a'+d;
1612238
let fullbase = "fullbase";
//let fullbase = "a3";

let sql = `create table if not exists fullbase(id int primary key auto_increment,sum float, author varchar(255) UNIQUE KEY, lastsend varchar(255))`;

//let sql = `create table if not exists post_number( id int primary key auto_increment, number int)`;

connection.query(sql, function(err, results) {
if(err) console.log(err);
else console.log("Таблица создана");
});



 sql = `SELECT * FROM ${fullbase} `   ;
// sql = `SELECT * FROM fullbase`   ;

    console.log(sql);

connection.query(sql,  function(err, results) {
    if(err) console.log(err);
	
    const users = results;
    console.log(users);
    console.log(users.length);

  // for(let i=0; i < users.length; i++){
   for(let i=0; i < 177; i++){


        let author = users[i].author;
        let sum = users[i].sum;
        let lastsend = users[i].lastsend;

		if (sum < (0.001))
		{
			sum = 0.001;
		}

		//	const sql12 = `UPDATE fullbase SET lastsend='0' WHERE author='${author}'`;
        //    connection.query(sql12,function(err, results) {
		//    if(err) console.log(err);   });
			
 		
			if (lastsend == d) {
				
			console.log('lastsend');

		//process.exit(1);

		} else {
			
		const sql12 = `UPDATE fullbase SET lastsend='${d}' WHERE author='${author}'`;
		//	const sql12 = `UPDATE fullbase SET lastsend='0' WHERE author='${author}'`;
            
		console.log(sql12);

		connection.query(sql12,function(err, results) {
		if(err) console.log(err);   });
			
		let fullsum = sum.toFixed(3) +" STEEM";
		//  fullsum = fullsum.toFixed(3)ж;
	   
	   console.log(fullsum);


		console.log('send');
		console.log('send');
		console.log('send');
		console.log('send');

		steem.broadcast.transfer(wifkey, "alexmove.witness", author, fullsum, "Witness vote rewards! Thank you for supporting @steemit-market and @alexmove.witness! Good luck!", function(err, result) {
		console.log(err, result);
		//process.exit(1);
		});


    }
	}
});


connection.end
