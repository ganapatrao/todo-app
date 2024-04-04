const jwt = require('jsonwebtoken');
const express = require('express');

const profile = [
  {
    userId: '001',
    email: 'test@gmail.com',
    password: '111',
  },
  {
    userId: '002',
    email: 'test2@gmail.com',
    password: '222',
  },
];

exports.signinUser = (req, res) => {
  const { email, password } = req.body;

  const filteredUserProfile = profile.find((user) => user.email === email);

  if (
    email !== filteredUserProfile.email ||
    password !== filteredUserProfile.password
  ) {
    return res
      .status(401)
      .send({ data: {}, meta: { message: 'Your credentials are invalid' } });
  }

  const userToken = jwt.sign(
    { userId: filteredUserProfile.userId },
    'bearerToken_123'
  );

  // Issue a Token
  return res.status(200).send({
    data: {
      token: userToken,
    },
    meta: { message: "You're logged in" },
  });
};
