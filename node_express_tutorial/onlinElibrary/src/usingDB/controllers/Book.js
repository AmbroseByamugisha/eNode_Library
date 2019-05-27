import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Book = {
  /**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async create(req, res) {
    const createQuery = `INSERT INTO
      books(id, title, author, owner_id, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      uuidv4(),
      req.body.title,
      req.body.author,
      req.user.id,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({
        "message": "book created successfully",
        "book":rows[0]});
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  // get all books
  async getAllBooks(req, res) {
    const findAllQuery = 'SELECT * FROM books';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, []);
      return res.status(200).send({"books": rows});
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get All Reflections
   * @param {object} req 
   * @param {object} res 
   * @returns {object} reflections array
   */
  async getMyBooks(req, res) {
    const findAllQuery = 'SELECT * FROM books where owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({"books": rows});
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */
  async getOne(req, res) {
    const text = 'SELECT * FROM books WHERE id=$1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'book not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Update A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM books WHERE id=$1 AND owner_id = $2';
    const updateOneQuery =`UPDATE books
      SET title=$1,author=$2,modified_date=$3
      WHERE id=$4 AND owner_id = $5 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      const values = [
        req.body.title || rows[0].title,
        req.body.author || rows[0].author,
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  /**
   * Delete A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM books WHERE id=$1 AND owner_id = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'book not found'});
      }
      return res.status(204).send({ 'message': 'book deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Book;