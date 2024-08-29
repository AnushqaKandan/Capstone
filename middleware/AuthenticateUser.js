import 'dotenv/config'
import jwt from 'jsonwebtoken'
const { sign } = jwt

function createToken(user) {
    return sign(
    {
     emailAdd: user.emailAdd,
     userPass: user.userPass
    }, 
    process.env.SECRET_KEY,
   {
    expiresIn: '1h'
   }
)}


export {
    createToken
}

