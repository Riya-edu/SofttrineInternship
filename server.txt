var express = require('express');
var mysql = require('mysql');
const app = express();
const port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:true}));


// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Winter@123#',
    database: 'formdata'
});

connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    }
    else {
        console.log(`Database Connected`)
        connection.query(`SHOW DATABASES`,
            function (err, result) {
                if (err)
                    console.log(`Error executing the query - ${err}`)
                else
                    console.log("Result: ", result)
            })
    }
})


// Set up middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

// Handle form submissions
app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const dob = req.body.dob;

    console.log(req.body)

    const sql = `INSERT INTO form (name, email, phone, dob) VALUES (?, ?, ?, ?)`;

    connection.query(sql, [name, email, phone, dob], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.send('Error inserting data');
        } else {
            console.log('Data inserted successfully');
            res.redirect('/');
        }
    });
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
