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