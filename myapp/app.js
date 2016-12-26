var express = require('express');
var path = require('path');
var app = express();
var routes = require('./routes');

var customers = require('./routes/customers');
var employees = require('./routes/employees');
var offices = require('./routes/offices');
var home = require('./routes/home');
var payments = require('./routes/payments');
var orders = require('./routes/orders')
var orderdetails = require('./routes/orderdetails');
var products = require('./routes/products');
var productlines = require('./routes/productlines');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var mysql  = require('mysql');

var connection = require('express-myconnection');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data


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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use( upload.array());
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// routes

/*
 customers
*/

app.get('/home',home.index);


app.get('/customers',customers.list);
app.post('/customers',customers.save);
app.get('/customers/add',customers.add);
app.get('/customers/delete/:customerNumber',customers.delete);
app.get('/customers/edit/:customerNumber',customers.edit);
app.post('/customers/edit/:customerNumber',customers.save_edit);


/*
   employees
*/
app.get('/employees',employees.list);
app.post('/employees',employees.save);
app.get('/employees/add',employees.add);
app.get('/employees/delete/:employeeNumber',employees.delete);
app.get('/employees/edit/:employeeNumber',employees.edit);
app.post('/employees/edit/:employeeNumber',employees.save_edit);


/*
*
* offices
*
* */

app.get('/offices',offices.list);
app.post('/offices',offices.save);
app.get('/offices/add',offices.add);
app.get('/offices/delete/:officeCode',offices.delete);
app.get('/offices/edit/:officeCode',offices.edit);
app.post('/offices/edit/:officeCode',offices.save_edit);


/*
 *
 * payments
 *
 * */
app.get('/payments',payments.list);
app.post('/payments',payments.save);
app.get('/payments/add',payments.add);
app.get('/payments/delete/:customerNumber',payments.delete);
app.get('/payments/edit/:customerNumber',payments.edit);
app.post('/payments/edit/:customerNumber',payments.save_edit);


/*
 *
 *orders
 *
 * */


app.get('/orders',orders.list);
app.post('/orders',orders.save);
app.get('/orders/add',orders.add);
app.get('/orders/delete/:orderNumber',orders.delete);
app.get('/orders/edit/:orderNumber',orders.edit);
app.post('/orders/edit/:orderNumber',orders.save_edit);

/*
 *
 *orderdetails
 *
 * */
app.get('/orderdetails',orderdetails.list);
app.post('/orderdetails',orderdetails.save);
app.get('/orderdetails/add',orderdetails.add);
app.get('/orderdetails/delete/:Id',orderdetails.delete);
app.get('/orderdetails/edit/:Id',orderdetails.edit);
app.post('/orderdetails/edit/:Id',orderdetails.save_edit);


/*
 *
 *products
 *
 * */

app.get('/products',products.list);
app.post('/products',products.save);
app.get('/products/add',products.add);
app.get('/products/delete/:productCode',products.delete);
app.get('/products/edit/:productCode',products.edit);
app.post('/products/edit/:productCode',products.save_edit);


/*
 *
 *productlines
 *
 * */

app.get('/productlines',productlines.list);
app.post('/productlines',productlines.save);
app.get('/productlines/add',productlines.add);
app.get('/productlines/delete/:productLine',productlines.delete);
app.get('/productlines/edit/:productLine',productlines.edit);
app.post('/productlines/edit/:productLine',productlines.save_edit);


// views engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




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
