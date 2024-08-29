import { connection as db } from '../config/index.js'
import { createToken} from '../middleware/AuthenticateUser.js'
import {compare, hash } from 'bcrypt'

class Users {
    fetchUsers(req, res) {
        try{
            const strQry = `SELECT userID, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile FROM Users;`
            db.query(strQry, (err, result) => {
                if(err) throw new Error('Issue when retrieving all users.')
               res.json({
            status: res.statusCode,
            result
            })
        
        })
          } catch(e){
             res.json({
                status: 404,
                msg: e.message
             })
          }
    }
fetchUser(req, res) {
    try {
        const strQry = `SELECT userID, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile
        FROM Users WHERE userID = ${req.params.id};`
        
        db.query(strQry, (err, result) => {
            if(err) throw new Error(`Unable to fetch user with id ${req.params.id}`)
            res.json({
                status: res.statusCode,
                result
            })
        })
    
        
    } catch (e) { 
        res.json({
            status: 404,
            msg: e.message
         })
    }
}

 async registerUser(req, res) {
    try {
        let data = req.body
        data.userPass = await hash(data.userPass, 12)
        // Payload
        let user = {
            emailAdd: data.emailAdd,
            userPass: data.userPass
        }
        let strQry = `
    INSERT INTO Users
    SET ?;
    `
        db.query(strQry, [data], (err) => {
            if (err) {
                res.json({
                    status: res.statusCode,
                    msg: 'This email has already been taken'
                })
            } else {
                const token = createToken(user)
                res.json({
                    token,
                    msg: 'You are now registered.'
                })
            }
        })
    } catch (e) {
        res.json({
            status: 404,
            err: e.message
        })
    }
}


 async updateUser(req, res) {
    try{
        let data = req.body
        if(data.userPass) {
            data.userPass = await hash(data.userPass, 12)
        }
    const strQry = `
    UPDATE Users
    SET ?
    WHERE userID = ${req.params.id}
    `
    db.query(strQry, [data], (err) => {
        if(err) throw new Error('Unable to update a user')
            res.json({
        status: res.statusCode,
        msg: "The user record was updated"
      })
    })
  } catch(e) {
    res.json({
        status: 400,
        msg: e.message
    })
  }
 }

 deleteUser(req, res) {
    try{
        const strQry = `
        DELETE FROM Users
        WHERE userID = ${req.params.id};
        `
        db.query(strQry, (err) => {
         if (err) throw new Error('To delete a user, please review your delete query.')
         res.json({
        status: res.statusCode,
        msg: "User deleted successfully"
        })
      })
    } catch(e) {
        res.json({
            status: 404,
            msg: e.message
         })
    }
 }

 async login(req, res) {
    try {
        const { emailAdd, userPass } = req.body;
        const strQry = `SELECT userID, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile 
                        FROM Users WHERE emailAdd = ?;`;
        db.query(strQry, [emailAdd], async (err, result) => {
            if (err) throw new Error('Unable to process login request.');
            if (result.length === 0) {
                return res.status(401).json({
                    status: 401,
                    msg: 'Incorrect email or password.',
                });
            }

            const user = result[0];
            const isValidPass = await compare(userPass, user.userPass);
            if (isValidPass) {
                const token = createToken({
                    id: user.userID,
                    emailAdd: user.emailAdd,
                    userRole: user.userRole,
                });
                res.json({
                    status: res.statusCode,
                    token,
                     user
                    
                });
            } else {
                res.status(401).json({
                    status: 401,
                    msg: 'Incorrect email or password.',
                });
            }
        });
    } catch (e) {
        res.status(404).json({
            status: 404,
            msg: e.message,
        });
    }
}
}

export{
    Users
}




