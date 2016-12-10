var express = require('express');
var path = require('path');
var app = express();

var routes = require('./routes');
var customers = require('./routes/customers');
var employees = require('./routes/employees');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var mysql  = require('mysql');

var connection = require('express-myconnection');


/*
*
* DataBase connection
*
* */
app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : 'dima201096',
        port : 3306, //port mysql
        database:'classicmodels'
    },'pool')
);

// routes

/*
 customers
*/


app.get('/table',customers.list);
app.get('/customers/add',customers.add);
app.post('/customers/add',customers.save);
app.get('/customers/delete/:customerNumber',customers.delete);
app.get('/customers/edit/:customerNumber',customers.edit);
app.post('/customers/edit/:customerNumber',customers.save_edit);

/*
   employees
*/
app.get('/employees',employees.list);
app.get('/employees/add',employees.add);
app.post('/employees/add',employees.save);
app.get('/employees/delete/:employeeNumber',employees.delete);
app.get('/employees/edit/:employeeNumber',employees.edit);
app.post('/employees/edit/:employeeNumber',employees.save_edit);


// views engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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



module.exports = app;
