const constants = require('../util/constants');

exports.createCourse = (payload, userId = constants.DEFAULT) => {
    if(!payload){
        return {
            errorType: constants.VALIDATION,
            message: 'Missing required elements'
        }
    }
    return {
        message: "Course created Successfully"
    }
}