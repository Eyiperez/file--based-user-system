const express = require('express');

const classes = require('./services/classes');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.json({ 'message': 'this is homepage' })
});

//Adding Students to a Class
app.get('/class/add', (req, res) => {

    const input = req.query;
    const className = req.query.class;
    const classFile = `classes/${className}.json`;
    const studentObj = {};
    studentObj.name = input.name;
    studentObj.age = parseInt(input.age);
    studentObj.city = input.city;
    studentObj.grade = parseInt(input.grade);
    console.log(className);

    if (input.hasOwnProperty('class') === false ||
        input.hasOwnProperty('name') === false ||
        input.hasOwnProperty('age') === false ||
        input.hasOwnProperty('grade') === false ||
        input.hasOwnProperty('city') === false) {
        res.json({ error: 'Please fill out all the information for the student' })
    } else {

        classes.add(classFile, studentObj);

        res.json({
            'added': studentObj,
            'class': className
        });
    }
});



//List All Students in a Class
app.get('/class/list', (req, res) => {
    const classToFind = req.query.class;
    const classFile = `classes/${classToFind}.json`

    classes.studentsInClass(classFile, classToFind, data => {
        res.json(data)
    })
});


//List Failing Students
app.get('/class/listfailing', (req, res) => {
    const classToFind = req.query.class;
    const classFile = `classes/${classToFind}.json`

    classes.failingStudents(classFile, classToFind, data => {
        res.json(data)
    })
});

//List Students from a Specific City
app.get('/class/listfromcity', (req, res) => {
    const classToFind = req.query.class;
    const classFile = `classes/${classToFind}.json`
    const city = req.query.city;

    classes.studentsByCity(classFile, classToFind, city, data => {
        res.json(data)
    })
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
