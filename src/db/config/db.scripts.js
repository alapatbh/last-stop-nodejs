const createCourse = `INSERT INTO qnda.tb_course ( course_name, is_active, created_by ) VALUES
                    ($1, $2, $3) RETURNING course_id`;

const getAllCoursesByUserId = `SELECT * FROM qnda.tb_course where created_by=$1 AND is_active=$2`;

const updateCourseNameById = `UPDATE qnda.tb_course SET course_name=$1 where course_id=$2 AND created_by=$3`;

module.exports = {
    createCourse,
    getAllCoursesByUserId,
    updateCourseNameById
}