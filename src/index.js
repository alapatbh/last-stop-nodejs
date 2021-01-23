const express = require('express');
const constants = require('./util/constants')
const app = express();
const courseServcie = require('./service/course.service');
const bodyParser = require('body-parser');
const {responsify} = require('./util/utils')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(process.env.port || constants.PORT, () => {
    console.log(`Last Stop listening at http://localhost:${constants.PORT}`)
})

app.post('/course', async (req, res) => {
    try{
        let payload = req.body;
        let result = await courseServcie.createCourse(payload);
        responsify(res, result, 201);
    }catch(error){
        responsify(res, 'unknown error', 500);
    }
})

app.get('/course', async (req, res) => {
    try{
        let result = await courseServcie.getAllCoursesByUserId();
        responsify(res, result);
    }catch(error){
        responsify(res, 'unknown error', 500);
    }
})

app.put('/course/:id', async (req, res) => {
    try{
        let payload = req.body;
        let courseId = req.params.id;
        let result = await courseServcie.updateCourseNameById(payload, courseId);
        responsify(res, result);
    }catch(error){
        responsify(res, 'unknown error', 500);
    }
})