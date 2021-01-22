const express = require('express');
const constants = require('./util/constants')
const app = express();
const courseServcie = require('./service/course.service');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(constants.PORT, () => {
    console.log(`Last Stop listening at http://localhost:${constants.PORT}`)
})

app.post('/course', async (req, res) => {
    try{
        let payload = req.body;
        let result = await courseServcie.createCourse(payload);
        res.status(201).send(result);
    }catch(error){
        res.status(500).send("unknown error");
    }
})