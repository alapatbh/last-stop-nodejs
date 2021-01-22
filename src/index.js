const express = require('express');
const constants = require('./util/constants')
const app = express();
const courseServcie = require('./service/course.service');

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(constants.PORT, () => {
    console.log(`Example app listening at http://localhost:${constants.PORT}`)
})

app.post('/course',(req, res) => {
    try{
        let payload = req.body;
        let result = courseServcie.createCourse(payload);
        res.status(201).send(result);
    }catch(error){
        res.status(500).send("unknown error");
    }
})