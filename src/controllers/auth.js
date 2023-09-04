const authModel = require('../models/auth');
const { response } = require('../helpers/response');
const jwt = require('jsonwebtoken');
const { APP_SECRET_KEY } = process.env;
const bycrpt = require('bcrypt');

exports.register = async (req, res) => {
  const { username, fullname, password, confirmPassword } = req.body;
  const checkUsername = await authModel.getUserByUsername([username]);
  const saltRounds = await bycrpt.genSalt(10);
  const hashPassword = await bycrpt.hash(password, saltRounds);
  const regMinLength = /^(?=.*?[#?!@$%^&*-]).{8,}$/;
  try {
    if (checkUsername.rowCount <= 0) {
      if (regMinLength.test(password)) {
        if (confirmPassword === password) {
          await authModel.register([username, fullname, hashPassword]);
          return response(res, 201, 'Register success!');
        } else {
          return response(res, 409, 'Sorry your password not match!');
        }
      } else {
        return response(res, 409, 'Sorry your password minimum eight characters and one special character!');
      }
    } else {
      return response(res, 409, "Sorry username already exist!")
    }
  } catch (error) {
    console.error(error)
    return response(res, 500, "An error occured!", error);
  }
};

