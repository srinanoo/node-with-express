require('dotenv').config();
const mongo = require('mongodb').MongoClient;

let conn;

function connectDB() {
    mongo.connect(process.env.DB_URL, async (err, db) => {
        if(err) throw err;
    
        // connect or create database
        conn = db.db("studentProj");
        console.log("Database Connected!");
        // console.log(conn);

        let collections = await conn.listCollections().toArray();
        let collectionNames = collections.map(c => c.name);

        if(!collectionNames.includes("studentsDetails")) {
            conn.createCollection("studentsDetails", (err, res)=> {
                if(err) throw err;
                console.log("Collection is created!");
                // console.log(res);
            });
        }
    });

    return conn;
}

module.exports = connectDB;
