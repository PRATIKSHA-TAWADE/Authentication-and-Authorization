const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// const  express = require('express');

app.use(express.json())



// const app = express();



const port = 8080;



app.get('/api', function(req, res){

    res.json({

        text: 'my api!'

    });

});



app.post('/api/login', function(req, res){

    //auth user

    const user = { id: 3 };

    const token = jwt.sign({ user }, 'my_secret_key');

    res.json({

        token: token

    });



});



app.get('/api/protected', ensureToken , function(req, res){

    jwt.verify(req.token, 'my_secret_key', function(err, data){

        if (err) {

            res.sendStatus(403);

        } else {

            res.json({

                text: 'this is protected ',

                data: data

            });

        }

    })

    

   }

);

function ensureToken(req, res, next){

    const bearerHeader = req.headers["authorization"];

    if(typeof bearerHeader !== 'undefined') {

        const bearer = bearerHeader.split("");

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();



    } else {

        res.sendStatus(403);

    }

}



app.listen(port, ()=>{

    console.log('example app listining at http://localhost:${port}')

});


// parse application/json
app.use(bodyParser.json());

// const port = 8080;




//Create Database Connection
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "crud",
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});


// creat a new Record
app.post("/api/create", (req, res) => {
	let data = { id: req.body.id, name: req.body.name, location: req.body.location };
	let sql = "INSERT INTO users SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		console.log(res)
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

// show all records
app.get("/api/view", (req, res) => {
	let sql = "SELECT * FROM users";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});
// 	jwt.verify(req.token, 'my_secret_key', function(err, data){

//         if (err) {

//             res.sendStatus(403);

//         } else {

//             res.json({

//                 text: 'this is protected ',

//                 data: data

//             });

//         }

//     })

    
// });

// show a single record
app.get("/api/view/:id", (req, res) => {
	let sql = "SELECT * FROM users WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// delete the record
app.delete("/api/delete/:id", (req, res) => {
	let sql = "DELETE FROM users WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});

// update the Record
app.put("/api/update/", (req, res) => {
	let sql = "UPDATE users SET name='" + req.body.name + "', location='" + req.body.location + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" })
		);
	});
});

app.listen(8000,()=>{
    console.log("server started on port 8000...");

}); 

