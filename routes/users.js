var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const UserModel = require('../models/user');
const authMiddleware = require('../middlewares/authorization');

/* add a new user */
router.post('/', async (req, res, next) => {
  try {
    const user = await UserModel.create(req.body);
    debugger;
    const token = await user.generateToken();
    res.send(token);
  } catch (e) {
    next(createError(400, 'invalid user data'));
  }
});

/** Login */
router.post('/login', async (req, res, next) => {
  debugger;
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!await user.verifyPassword(req.body.password)) throw 'error';
    const token = await user.generateToken();
    res.send(token);
  } catch (e) {
    next(createError(401, 'invalid credentials'));
  }
});

//verify username
router.post('/username', async (req, res, next) => {
  // debugger;
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user === null) res.send(200); //if user doesnt exit then it is valid
    else throw '';
  } catch (e) {
    next(createError(400, 'user already exists'));
  }
});


/** middlware to protect user routes */

router.use(authMiddleware);



/* GET user data. */
router.get('/info', async (req, res, next) => {
  try {
    // debugger;
    // const user = await UserModel.findById(req.loggedUser.id);
    res.send(req.loggedUser);
  }
  catch (e) {
    next(createError(404, 'user not found'));
  }
});

/* GET user by id. */
router.get('/:id', async (req, res, next) => {
  try {
    // debugger;
    const user = await UserModel.findById(req.params.id);
    res.send(user);
  }
  catch (e) {
    next(createError(404, 'user not found'));
  }
});

/* change password of user */
router.patch('/pass', async (req, res, next) => {
  try {
    debugger;
    if (!await req.loggedUser.verifyPassword(req.body.password)) throw 'error';
    req.loggedUser.password = req.body.newPassword;
    await req.loggedUser.save(); //normal update functions dont call save
    res.sendStatus(202);
  }
  catch (e) {
    next(createError(400, 'invalid password'));
  }
});

/* update a user */
router.patch('/', async (req, res, next) => {
  try {
    debugger;
    delete req.body.password; //to prevent changing of password except through pass route 
    await UserModel.updateOne({ _id: req.loggedUser._id }, req.body);
    res.sendStatus(202);
  }
  catch (e) {
    next(createError(400, 'invalid data. update failed'));
  }
});

/* delete a user */
router.delete('/', async (req, res, next) => {
  try {
    await UserModel.deleteOne({ _id: req.loggedUser._id });
    res.sendStatus(200);
  }
  catch (e) {
    next(createError(400, 'invalid user. delete failed'));
  }
});


/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await UserModel.find({}, { username: true });
    res.send(allUsers);
  }
  catch (e) {
    next(createError(400, 'unable to get users'));
  }
});
module.exports = router;
