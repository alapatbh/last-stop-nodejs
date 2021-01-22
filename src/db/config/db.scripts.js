const createCourse = `INSERT INTO qnda.tb_course ( course_name, is_active, created_by ) VALUES
                    ($1, $2, $3) RETURNING course_id`;

module.exports = {
    createCourse
}