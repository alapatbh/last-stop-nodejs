const coursedb = require("../db/course.db");
const constants = require("../util/constants")

exports.createCourse = async (courseName, userId) => {
    let result = await coursedb.createCourse(courseName, userId);
    return {
        courseId : result[0].course_id
    }
}

const mapCoursesObj = (each) => ({
    courseId : each.course_id,
    courseName: each.course_name,
    createdAt: each.created_at
})

exports.getAllCoursesByUserId = async (userId) => {
    let result = await coursedb.getAllCoursesByUserId(userId);
    return result.map(mapCoursesObj)
}

exports.updateCourseNameById = async (payload, courseId, userId) => {
    const { courseName } = payload;
    if(!courseId || !courseName){
        return {
            errorType: constants.VALIDATION,
            message: "Invalid Course Id or Course Name"
        }
    }
    const result = await coursedb.updateCourseNameById(courseId, courseName, userId);
    if(!result){
        return {
            errorType: constants.NOT_FOUND,
            message: "CourseId not found"
        }
    }
    return {
        message : "Updated course name successfully"
    }
}