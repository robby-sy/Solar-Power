module.exports = (error,req,res,next)=>{
    msg=""
    code=0
    switch (error.name) {
        case 'SequelizeValidationError' :
            msg = error.errors[0].message
            code = 400
            break;

        case 'SequelizeUniqueConstraintError':
            msg = 'email is not available',
            code = 400
            break;

        case 'unauthentication':
            msg = error.message
            code = 400
            break;
        
        case 'bad request':
            msg = error.message
            code = 400
            break;

        default:
            msg = 'Internal Server Error'
            code = 500
            break;
    }
    res.status(code).json({msg})
}