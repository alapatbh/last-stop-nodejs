const dbClient = require('./api/db.client.local');

exports.createCourse = async (courseName, userId) => {
    const isActive = true;
    let values = [
      courseName,
      isActive,
      userId
    ];
    return await dbClient.executeQuery('createCourse', values);
}

exports.getAllCoursesByUserId = async (userId) => {
  const isActive = true;
  let values = [
    userId,
    isActive
  ];
  return await dbClient.executeQuery('getAllCoursesByUserId', values);
}

exports.updateCourseNameById = async (courseId, courseName, userId) => {
  const values = [
    courseName,
    courseId,
    userId,
  ]
  return await dbClient.executeQuery('updateCourseNameById', values);
}