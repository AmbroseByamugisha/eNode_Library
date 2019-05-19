import express from 'express';
// import db from '../db/db';
import TodoController from '../todosControllers/todos';

const router = express.Router();

//the routers
router.get('/api/v1/todos', TodoController.getAllTodos);
router.get('/api/v1/todos/:id', TodoController.getTodo);
router.post('/api/v1/todos', TodoController.createTodo);
router.put('/api/v1/todos/:id', TodoController.updateTodo);
router.delete('/api/v1/todos/:id', TodoController.deleteTodo);

// export this router middleware to app.js
// can create a db middleware and export it too to
//app.js and use app.use for middleware
export default router;
