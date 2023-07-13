const jwt = require('jsonwebtoken')
module.exports = {
    signToken : (payload)=>{
        return jwt.sign(payload,process.env.JWT_SECRET_KEY)
    },
    verifyToken : (token)=>{
        return jwt.verify(token,process.env.JWT_SECRET_KEY)
    }
}
