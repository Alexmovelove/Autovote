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
let votey = settings.account;

config = {
  host: "localhost",
  user: user_mysql,
  database: bd_name,
  password: password_mysql
}

const connection = mysql.createConnection(config);

	var d = new Date(); // Today!
	d.setDate(d.getDate()-num_day); // Yesterday!
	d = d.toJSON().split("T")[0];
	d = d.replace(/-/gi, '');
	console.log(d);   

let mytable_p = 'p'+d;
let mytable_c = 'c'+d;
let mytable = 'a'+d;

//let fullbase = "steemit-market";
//let fullbase = "alexmove.witness";
//let fullbase = "вboylikegirl.wit";
let fullbase = "alexmove.witness";
let table = "cashback";


//let sql = "create table if not exists `"+fullbase+"`(id int primary key auto_increment, account varchar(255) UNIQUE KEY, ofme varchar(255), lastget varchar(255))";
let sql = "create table if not exists `"+table+"`(id int primary key auto_increment, mv float, account varchar(255) UNIQUE KEY, ofme varchar(255), lastget varchar(255),lastsend varchar(255))";


connection.query(sql, function(err, results) {
if(err) console.log(err);
else console.log("Таблица создана");
});

steem.api.call('database_api.list_witness_votes',{start:[fullbase,""], limit:200, order:"by_witness_account"},function(err, result){


const myObjStr = JSON.stringify(result);

let what = JSON.parse(myObjStr);

 const users = result;
let aaa=0;

function replacer(key, value) {
 if (aaa < 111)
	{
	 if (key === 'witness')
		if (value > fullbase)
			aaa = 111;
	  if (key === 'account')
	  {
			 console.log(value);
			 console.log(d);
			 console.log(d);
			 console.log(d);

		  const sql4 = "INSERT INTO `"+table+"`(mv,account, ofme, lastget,lastsend) VALUES('0','"+value+"','0',"+d+",'0')";
		  
		  connection.query(sql4, function(err, results) {
			if(err) console.log(err);
			else console.log("добавлена запись", value);
			});
	  }	
	}  
  return value;
}

const userStr = JSON.stringify(result, replacer);
})	


