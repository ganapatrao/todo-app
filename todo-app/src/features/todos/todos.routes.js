const express = require('express');
const toDoController = require('./todos.controller');
const validator = require('./todos.validator');
const verifyUserToken = require('../accounts/verifyToken');

const router = express.Router();

router.get('/', verifyUserToken, toDoController.getall);
router.get('/:id', verifyUserToken, toDoController.getToDo);
router.post('/', verifyUserToken, toDoController.addToDo);
router.patch(
  '/:id',
  verifyUserToken,
  validator.patchValidator,
  toDoController.put
);
router.delete('/:id', verifyUserToken, toDoController.delete);

module.exports = router;
