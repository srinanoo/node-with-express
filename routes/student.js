const express = require('express');
const router = express.Router();
// const conn = require('../dbConfig').connectDB();
require('dotenv').config();
const mongo = require('mongodb').MongoClient;
// const conn = require('../dbConfig');

// let conn;

// const dbConn = () => {
//     mongo.connect(process.env.DB_URL, async (err, db) => {
//         if(err) throw err;
    
//         // connect or create database
//         conn = db.db("studentProj");
//         console.log("Database Connected!");
//         // console.log(conn);
//     });

//     return conn;
// }

router.get('/', (req, res)=> {
    // res.send("Main Students Route");
    // console.log(conn);
    // conn.collection("studentsDetails").find({}).toArray((err, res)=> {
    //     if(err) throw err;
    //     res.send(res);
    //     // console.log(res);
    // });

    // console.log(conn);

    // conn.collection("studentsDetails").insertOne({name: "Dinesh", active: true, subject: "JS"}, (err, res)=> {
    //     if(err) throw err;
    //     res.send(res);
    //     // console.log(res);
    // });

    mongo.connect(process.env.DB_URL, async (err, db) => {
        if(err) throw err;
    
        // connect or create database
        let conn = db.db("studentProj");
        console.log("Database Connected!");
        // console.log(conn);

        // let collections = await conn.listCollections().toArray();
        // let collectionNames = collections.map(c => c.name);

        // if(!collectionNames.includes("studentsDetails")) {
        //     conn.createCollection("studentsDetails", (err, res)=> {
        //         if(err) throw err;
        //         console.log("Collection is created!");
        //         // console.log(res);
        //     });
        // }

        conn.collection("studentsDetails").insertOne({name: "Dinesh", active: true, subject: "JS"}, (err, res1)=> {
            if(err) throw err;
            res.send(res1);
            console.log(res1);
        });
    });
});

router.get('/show', (req, res)=> {
    mongo.connect(process.env.DB_URL, async (err, db) => {
        if(err) throw err;
    
        // connect or create database
        let conn = db.db("studentsNew");
        console.log("Database Connected!");
        // console.log(conn);

        conn.collection("newCollection").find({}).toArray((err, res1)=> {
            if(err) throw err;
            res.send(res1);
            console.log(res1);
        });
    }); 

    // let conn1 = conn.connectDB();
    // console.log(conn1);
});

router.get('/create', (req, res)=> {
    res.send("This is the main students route to create Students");
});

module.exports = router;