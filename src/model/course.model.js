const model = require("../db/course.db")

exports.createCourse = async (courseName, userId) => {
    let result = await model.createCourse(courseName, userId);
    return {
        courseId : result[0].course_id
    }
} 