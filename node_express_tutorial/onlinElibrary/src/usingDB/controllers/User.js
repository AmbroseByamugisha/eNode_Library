import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Helper from './Helper';

const User = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(id, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuidv4(),
      req.body.email,
      hashPassword,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({
        "message": "User created successfully",
        "user": rows 
      });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  },
  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({'message': 'The email you provided does not exist'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'The password you provided does not match the email provided' });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({
        "message": "user logged in successfully", 
        "token": token });
    } catch(error) {
      return res.status(400).send(error)
    }
  },

  //get all users
  async getAllUsers(req, res) {
    const checkAdminQuery = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(checkAdminQuery, [req.user.id]);
    if(rows[0].role == 'admin') {
      const findAllUsersQuery = 'SELECT * FROM users';
      try {
        const { rows, rowCount } = await db.query(findAllUsersQuery, []);
        return res.status(200).send({"users": rows});
      } catch(error) {
        return res.status(400).send(error);
        }
      }
      else{
        return res.status(403).send({'message': 'Permission Denied'});
      }
  },

  /**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
   // verify token of admin
  async delete(req, res) {
    // const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    // start
    const checkAdminQuery = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(checkAdminQuery, [req.user.id]);
    if(rows[0].role == 'admin') {
        const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
        const { rows } = await db.query(deleteQuery, [req.params.id]);
        return res.status(200).send({'message': 'user deleted'});
        if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
        }
      }
      else{
        return res.status(403).send({'message': 'Permission Denied'});
      }
    }    
  }


export default User;