var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const BodyParser= require("body-parser");
const Bcrypt= require("bcryptjs");

var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');

var app = express();

const mongoose = require("mongoose");
/*
const mongoDB = "mongodb+srv://Barbara-K-322:Loyola-2023@cluster0.lvagtqb.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection; 
db.on("error", console.error.bind(console, "MongoDB connection error:"));
*/

//main().catch(err => console.log(err));

/*
 app.use(BodyParser.json());
 app.use(BodyParser.urlencoded({ extend: true }));
*/

async function myConnection() {
  await mongoose.connect('mongodb+srv://Barbara-K-322:Loyola-2023@cluster0.lvagtqb.mongodb.net/SoccerApp?retryWrites=true&w=majority');
}

/*
 const UserModel= new mongoose.model("user", {
    username: String,
    password: String
 });

 UserSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password= Bcrypt.hashSync(this.password, 10);
    next();
 });
 
  UserSchema.methods.comparePassword= function(plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
 };
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/account', accountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
app.post("/register", async (request, response) => {
    try {
        request.body.password= Bcrypt.hashSync(request.body.password, 10);
        var user= new UserModel(request.body);
        var result= await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
 });

 app.post("/login", async (request, response) => {
    try {
        var user= await UserModel.findOne({ username: request.body.username}).exec();
        if(!user) {
            return response.status(400).send({ message: "Error: Invalid Username"});
        }
        user.comparePassword(request.body.password, (error, match) => {
            if(!match) {
                return response.status(400).send({ message: "Error: Invalid Password"});
            }
        });
        response.send({ message: "Username and Password Combination are Correct!"});
    } catch (error) {
        response.status(500).send(error);
    }
 });
 
  app.get("/dump", async (request, response) => {
    try {
        var result= await UserModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
 });

 app.listen(3000, () => {
    console.log(" ");
 });
*/

module.exports = app;
