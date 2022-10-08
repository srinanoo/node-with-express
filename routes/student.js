const express = require('express');
const router = express.Router();
// const conn = require('../dbConfig').connectDB();
require('dotenv').config();
// const mongo = require('mongodb').MongoClient;
const conn = require('../dbConfig');

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
    // mongo.connect(process.env.DB_URL, async (err, db) => {
    //     if(err) throw err;
    
    //     // connect or create database
    //     let conn = db.db("studentsNew");
    //     console.log("Database Connected!");
    //     // console.log(conn);

    //     conn.collection("newCollection").find({}).toArray((err, res1)=> {
    //         if(err) throw err;
    //         res.send(res1);
    //         console.log(res1);
    //     });
    // }); 

    // console.log(conn);
    conn.connectToServer((err) => {
        if(err) throw err;
        conn.getDb().collection("newCollection").find({}).toArray((err1, res1)=> {
            if(err1) throw err1;
            res.send(res1);
            console.log(res1);
        });
    });
});

router.get('/show/:name', (req, res)=> {
    // console.log(conn);
    conn.connectToServer((err) => {
        if(err) throw err;
        console.log(req.params.name);
        conn.getDb().collection("newCollection").find({$or: [{name: req.params.name}, {subject: req.params.name}]}).toArray((err1, res1)=> {
            if(err1) throw err1;
            res.send(res1);
            console.log(res1);
        });
    });
});

router.get('/create', (req, res)=> {
    conn.connectToServer((err) => {
        if(err) throw err;
        conn.getDb().collection("anotherCollection").insertOne({name: "Dinesh", active: true}, (err1, res1)=> {
            if(err1) throw err1;
            res.send(res1);
            console.log(res1);
        });
    });
});

router.post('/insertDetails', (req, res) => {
    conn.connectToServer((err) => {
        if(err) throw err;
        const { name, school, type } = req.body;

        if(name!="" && school!="" && type!="") {
            conn.getDb().collection("classDetails").insertOne({name: name, school: school, type: type}, (err1, res1)=> {
                if(err1) throw err1;
                res.send(res1);
                console.log(res1);
            });
        } else {
            res.send("Please enter values for Name, School and Type");
        }
    });
});

router.post('/modifyDetails', (req, res) => {
    conn.connectToServer((err) => {
        if(err) throw err;
        const { name, school, type, flag } = req.body;

        if(name!="" && type!="") {
            if(flag=="U") {
                conn.getDb().collection("classDetails").updateOne({type: type}, {$set: {name: name}}, (err1, res1)=> {
                    if(err1) throw err1;
                    res.send(res1);
                    console.log(res1);
                });
            } else {
                conn.getDb().collection("classDetails").deleteOne({type: type}, (err1, res1)=> {
                    if(err1) throw err1;
                    res.send(res1);
                    console.log(res1);
                });
            }
        }
    });
});

router.post('/updateDetails', (req, res) => {
    conn.connectToServer((err) => {
        if(err) throw err;
        const { name, school, type } = req.body;

        if(name!="" && type!="") {
            conn.getDb().collection("classDetails").updateOne({type: type}, {$set: {name: name}}, (err1, res1)=> {
                if(err1) throw err1;
                res.send(res1);
                console.log(res1);
            });
        }
    });
});

router.post('/deleteDetails', (req, res) => {
    conn.connectToServer((err) => {
        if(err) throw err;
        const { type } = req.body;

        if(type!="") {
            conn.getDb().collection("classDetails").deleteOne({type: type}, (err1, res1)=> {
                if(err1) throw err1;
                res.send(res1);
                console.log(res1);
            });
        }
    });
});

router.post('/showDetails', (req, res) => {
    conn.connectToServer((err) => {
        if(err) throw err;
        const { name, school, type } = req.body;

        if(name!="") {
            conn.getDb().collection("classDetails").find({name: name}).toArray((err1, res1)=> {
                if(err1) throw err1;
                res.send(res1);
                console.log(res1);
            });
        }
        if(school!="") {
            conn.getDb().collection("classDetails").find({school: school}).toArray((err1, res1)=> {
                if(err1) throw err1;
                res.send(res1);
                console.log(res1);
            });
        }
        
    });
});


router.get('/createCollection', (req, res)=> {
    conn.connectToServer(async (err) => {
        if(err) throw err;

        let dbConn = conn.getDb();

        let collections = await dbConn.listCollections().toArray();
        let collectionNames = collections.map(c => c.name);

        if(!collectionNames.includes("collection4")) {
            dbConn.createCollection("collection4", (err1, res1)=> {
                if(err1) throw err1;
                console.log(res1);
                console.log("Collection is created!");
                res.end();
            });
        }
    });
});

module.exports = router;