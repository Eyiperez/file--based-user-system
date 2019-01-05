const fs = require('fs');
const students = require('./students');



const add = (classFile, student) => {

    students.add(classFile, student);

}

const studentsInClass = (classFile, classToFind, cb) => {
    fs.readFile(classFile, 'utf8', (err, data) => {
        if (err) {
            const errorMess = {
                error: `Class ${classToFind} lol doesnt exist.`
            }
            cb(errorMess);
        } else {
            cb({ 'students': JSON.parse(data) })
        }

    });
}

const failingStudents = (classFile, classToFind, cb) => {
    fs.readFile(classFile, 'utf8', (err, data) => {
        if (err) {
            const errorMess = {
                error: `Class ${classToFind} lol doesnt exist.`
            }
            cb(errorMess);
        } else {
            const studentList = JSON.parse(data)
            console.log(studentList)
            const failingStudentsArr = []
            for (let i = 0; i < studentList.length; i++) {
                if (studentList[i].grade < 50) {
                    failingStudentsArr.push(studentList[i]);
                }
            }
            cb({ 'students': failingStudentsArr })
        }

    });
}

module.exports = {
    add,
    studentsInClass,
    failingStudents

}