import express from "express";
import mysql from "mysql";
import cors from "cors";
//import mysql2 from "mysql2";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.listen(8800, () => {
    console.log("Connected to backend.");
});

const db = mysql.createConnection({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, //it is imp as you're using diff port
    multipleStatements: process.env.DB_MULTIPLE_STATEMENTS === 'true',
});

app.get("/", (req, res) => {
    res.json("hello");
});

app.post("/register", (req, res) => {
    const sentEmail = req.body.Email;
    const sentUserName = req.body.UserName;
    const sentPassword = req.body.Password;

    //now you can add record 
    const SQL = `INSERT INTO user (name, mail, password)
    VALUES(?,?,?)`
    //set value variable
    const value = [sentUserName, sentEmail, sentPassword];
    db.query(SQL, value, (err, results) => {
        if (err) {
            res.send({ error: err });
        }
        else {
            console.log('User Inserted Successfully!');
            res.send({ message: 'User Added!' });
        }
    })
});

app.post("/register2", (req, res) => {
    const sentEmail = req.body.Email;
    const sentUserName = req.body.UserName;
    const sentPassword = req.body.Password;

    // Check if any of the fields are empty
    if (!sentEmail || !sentUserName || !sentPassword) {
        return res.status(400).json({ error: "All fields are necessary." });
    }

    // Check if the email is already registered
    const checkDuplicateEmailSQL = `SELECT * FROM user WHERE mail = ?`;
    db.query(checkDuplicateEmailSQL, [sentEmail], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        // Email is not duplicate, proceed with registration
        const insertUserSQL = `INSERT INTO user (name, mail, password) VALUES (?, ?, ?)`;
        const values = [sentUserName, sentEmail, sentPassword];

        db.query(insertUserSQL, values, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else {
                console.log('User Inserted Successfully!');
                return res.json({ message: 'User Added!' });
            }
        });
    });
});


//now create route for login

app.post("/login", (req, res) => {
    const sentLoginUserName = req.body.LoginUserName;
    const sentLoginPassword = req.body.LoginPassword;

    const SQL = `SELECT * FROM user
                WHERE name = ? && password = ?`
    //set value variable
    const value = [sentLoginUserName, sentLoginPassword];
    db.query(SQL, value, (err, results) => {
        if (err) {
            res.send({ error: err });
        }
        if (results.length > 0) {
            res.send(results);
        }
        else {
            res.send({ message: `Credentials don't verified!` });
        }
    })
});



app.get('/productInfo', (req, res) => {
    db.query("SELECT * FROM product_info", (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
    });
});

