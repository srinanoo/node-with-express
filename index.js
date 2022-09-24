const express = require('express');
const app = express();

// const studentRoute = 

// app.get('/', (req, res)=>{
//     res.send("Main Application!");
// });

// app.get('/create', (req, res)=> {
//     res.send("User to be created here...");
// });

// app.get('/show', (req, res)=> {
//     res.send("To show the data");
// });

// app.get('/show/:id', (req, res)=> {
//     res.send("To show the data = " + req.params.id);
// });

// app.get('/update', (req, res)=> {
//     res.send("Updating the user will be done here...");
// });

// app.get('/delete', (req, res)=> {
//     res.send("Deleting the user will be done here...");
// });

const studentDetails = require('./routes/student');
app.use('/api/v1/studentDetails', studentDetails); // http://localhost:4000/api/v1/studentDetails

const classDetails = require('./routes/class');
app.use('/api/v1/classDetails', classDetails); // http://localhost:4000/api/v1/classDetails

const teacherDetails = require('./routes/teachers');
app.use('/api/v1/teacherDetails', teacherDetails); // http://localhost:4000/api/v1/teacherDetails

app.get('/*', (req, res)=> {
    return res.send("Invalid Route access");
})

app.listen(4000);