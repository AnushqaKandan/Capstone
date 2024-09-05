import { connection as db } from '../config/index.js';
import { createToken } from '../middleware/AuthenticateUser.js';
import { compare, hash } from 'bcrypt';

class Users {
    // Fetch all users
    fetchUsers(req, res) {
        try {
            const strQry = `SELECT userID, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile FROM Users;`;
            db.query(strQry, (err, result) => {
                if (err) {
                    console.error('Error retrieving users:', err);
                    return res.status(500).json({ msg: 'Issue when retrieving all users.' });
                }
                res.json({ status: res.statusCode, result });
            });
        } catch (e) {
            console.error('Error in fetchUsers:', e);
            res.status(500).json({ msg: e.message });
        }
    }

    // Fetch a single user by ID
    fetchUser(req, res) {
        try {
            const userID = parseInt(req.params.id, 10);
            if (isNaN(userID)) return res.status(400).json({ msg: 'Invalid user ID' });

            const strQry = `SELECT userID, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile FROM Users WHERE userID = ?;`;
            db.query(strQry, [userID], (err, result) => {
                if (err) {
                    console.error('Error fetching user:', err);
                    return res.status(500).json({ msg: `Unable to fetch user with id ${userID}` });
                }
                if (result.length === 0) return res.status(404).json({ msg: 'User not found' });
                res.json({ status: res.statusCode, result: result[0] });
            });
        } catch (e) {
            console.error('Error in fetchUser:', e);
            res.status(500).json({ msg: e.message });
        }
    }

    // Register a new user
    async registerUser(req, res) {
        try {
            const data = req.body;
            data.userPass = await hash(data.userPass, 12);
            const user = {
                emailAdd: data.emailAdd,
                userPass: data.userPass
            };

            const strQry = `INSERT INTO Users SET ?;`;
            db.query(strQry, [data], (err) => {
                if (err) {
                    console.error('Error registering user:', err);
                    return res.status(500).json({ msg: 'This email has already been taken' });
                }
                const token = createToken(user);
                res.json({ token, msg: 'You are now registered.' });
            });
        } catch (e) {
            console.error('Error in registerUser:', e);
            res.status(500).json({ msg: e.message });
        }
    }

    // Update an existing user
    async updateUser(req, res) {
        try {
            const data = req.body;
            if (data.userPass) {
                data.userPass = await hash(data.userPass, 12);
            }
            const userID = parseInt(req.params.id, 10);
            if (isNaN(userID)) return res.status(400).json({ msg: 'Invalid user ID' });

            const strQry = `UPDATE Users SET ? WHERE userID = ?;`;
            db.query(strQry, [data, userID], (err) => {
                if (err) {
                    console.error('Error updating user:', err);
                    return res.status(500).json({ msg: 'Unable to update user' });
                }
                res.json({ status: res.statusCode, msg: 'The user record was updated' });
            });
        } catch (e) {
            console.error('Error in updateUser:', e);
            res.status(500).json({ msg: e.message });
        }
    }

    // Delete a user
    deleteUser(req, res) {
        try {
            const userID = parseInt(req.params.id, 10);
            if (isNaN(userID)) return res.status(400).json({ msg: 'Invalid user ID' });

            const strQry = `DELETE FROM Users WHERE userID = ?;`;
            db.query(strQry, [userID], (err) => {
                if (err) {
                    console.error('Error deleting user:', err);
                    return res.status(500).json({ msg: 'Error deleting user' });
                }
                res.json({ status: res.statusCode, msg: 'User deleted successfully' });
            });
        } catch (e) {
            console.error('Error in deleteUser:', e);
            res.status(500).json({ msg: e.message });
        }
    }

    // Login a user
    async login(req, res) {
        try {
            const { emailAdd, userPass } = req.body;
            const strQry = `SELECT userID, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile 
                            FROM Users WHERE emailAdd = ?;`;

            db.query(strQry, [emailAdd], async (err, results) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        msg: 'Unable to process login request.',
                        error: err.message
                    });
                }

                if (results.length === 0) {
                    return res.status(401).json({
                        status: 401,
                        err: 'Incorrect email or password.',
                    });
                }

                const user = results[0];
                const isValidPass = await compare(userPass, user.userPass);

                if (isValidPass) {
                    const token = createToken({
                        id: user.userID,
                        emailAdd: user.emailAdd,
                        userRole: user.userRole, // Send userRole in the token payload
                    });

                    return res.status(200).json({
                        status: 200,
                        token,
                        user,
                        msg: 'Login successful.'
                    });
                } else {
                    return res.status(401).json({
                        status: 401,
                        err: 'Incorrect email or password.',
                    });
                }
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                msg: 'Internal server error.',
                error: e.message
            });
        }
    }
    
}

export { Users };
