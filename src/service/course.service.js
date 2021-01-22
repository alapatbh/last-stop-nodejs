const constants = require('../util/constants');
const courseModel =  require('../model/course.model')

exports.createCourse = async (payload, userId = constants.DEFAULT) => {
    if(!payload){
        return {
            errorType: constants.VALIDATION,
            message: 'Missing required elements'
        }
    }
    let {courseName} = payload;
    if(courseName){
        return await courseModel.createCourse(courseName, userId);
    }else{
        return {
            errorType: constants.VALIDATION,
            message: "Invalid Payload"
        }
    }
}