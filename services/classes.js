const fs = require('fs');
const students = require('./students');



const add = (classFile, student) => {

    students.add(classFile, student);

}

module.exports = {
    add

}