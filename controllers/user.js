const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;
const User = require('../models/User');

const signinValidation = require('../validation/signin');
const signupValidation = require('../validation/signup');

exports.signupUser = async (req, res, next) => {
  const { errors, isValid } = signupValidation(req.body);
  const { nickname, email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  };

  const user = await User.findOne({ email });
  if (user) {
    errors.email = 'Email already exists';
    return res.status(400).json(errors);
  };

  try {
    const newUser = await new User({ nickname, email, password }).save();
    res.json(newUser);
  } catch (err) {
    console.log(err)
  };
};

exports.signinUser = async (req, res, next) => {
  const { errors, isValid } = signinValidation(req.body);
  const { email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  };

  const user = await User.findOne({ email });
  if (!user) {
    errors.email = 'User not found';
    return res.status(404).json(errors);
  };

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    errors.password = 'Password incorrect';
    return res.status(400).json(errors);
  };

  const payload = { id: user.id, nickname: user.nickname };

  jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
    res.json({
      success: true,
      token: 'Bearer ' + token
    });
  }
  );
};

exports.getUser = (req, res, next) => { // user data is avaliable in req object
  res.json({
    id: req.user.id,
    nickname: req.user.nickname,
    email: req.user.email
  });
};