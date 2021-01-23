const constants =  require('./constants')

exports.responsify = (res, body, responseCode) => {

    if(body && body.errorType){
        if(body.errorType == constants.VALIDATION ){
            responseCode = 400;
        }else if(body.errorType == constants.NOT_FOUND){
            responseCode = 404;
        }else if(body.errorType === constants.METHOD_NOT_ALLOWED){
            responseCode = 405;
        }else if(body.errorType == constants.DUPLICATE){
            responseCode = 409;
        }
    }

    if(!responseCode){
        responseCode = 200; 
    }
    res.status(responseCode).send(body.message ? {message: body.message} : body);
}