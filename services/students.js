const fs = require('fs');


const save = (classFile, studentList) => {
    console.log('IN function save');
    const fileblob = JSON.stringify(studentList);
    console.log(fileblob);
    fs.writeFile(classFile, fileblob, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};

const load = (classFile, cb) => {
    console.log('in LOAD!');
    fs.readFile(classFile, 'utf8', (err, data) => {
        if (!data) {
            cb([])
            return;

        } else {
            const studentData = JSON.parse(data);
            console.log('this is data', studentData);
            cb(studentData, classFile);
        }
    })
}


const add = (classFile, student, cb) => {
    load(classFile, currentStudents => {
        console.log(student);
        //console.log('current student', currentStudents)
        currentStudents.push(student);
        save(classFile, currentStudents, (err) => {
            cb(err);
        });
    })
}

module.exports = {
    save,
    load,
    add,
}