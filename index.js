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
    // console.log(className);
    classes.add(classFile, studentObj);

    res.json({
        'added': studentObj,
        'class': className
    });
});



//List All Students in a Class
app.get('/class/list', (req, res) => {
    res.json({ 'message': 'show list of students per class' })
});

//List Failing Students
app.get('/class/listfailing', (req, res) => {
    res.json({ 'message': 'show list of students failing in class' })
});

//List Students from a Specific City
app.get('/class/listfromcity', (req, res) => {
    res.json({ 'message': 'show students from a class from a specific city' })
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
