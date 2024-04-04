const { body, validationResult, param } = require('express-validator');

module.exports.postValidator = (req, res, next) => {
  body('title').notEmpty().withMessage('Title is required');
  body('description').notEmpty().withMessage('Description is required');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports.patchValidator = (req, res, next) => {
  param('id').notEmpty().withMessage('ID is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
