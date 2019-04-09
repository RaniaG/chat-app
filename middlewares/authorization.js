var createError = require('http-errors');
const UserModel=require('../models/user');

module.exports=async (req, res, next) => {
    try {
      // debugger;
      const token=req.headers.authorization.split(' ')[1];
      const user = await UserModel.verifyToken(token);
      req.loggedUser = user;
      next();
    }
    catch (err) {
      // debugger;
      next(createError(401, 'unauthorized'));
    }
  }