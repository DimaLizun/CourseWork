const url = require('url');

exports.list = function (req,res) {

    //const str = ":sorts";
    var param = req.params.sorts;
    var field=req.query.sorts;


    req.getConnection(function (err,connection) {
        var query2 = connection.query('SELECT employeeNumber FROM employees', function (err, emps) {
            if (err)
                console.log("ERROR" + err);
            var query ='SELECT * FROM customers '
                +(field?('order by '+field):'');

            //console.log(query);
            connection.query(query, function (err, cust) {
                if (err)
                    console.log("ERROR" + err);
                var data={page_title:"Customers - Node.js", data:cust,emps:emps};

                var a = [];
                res.render('customers',data);

            });
        });
    });
};




exports.add = function(req, res){
    res.render('index',{page_title:"Add Customers"});
};

exports.edit  = function (req,res) {
    var id = req.params.customerNumber;
    req.getConnection(function (err,connection) {
        var query  = connection.query('SELECT * FROM customers WHERE customerNumber = ?',[id],function (err,rows) {
            if(err)
                console.log("edit error%s", err);

            res.render('edit_customers',{page_title: "edit", data: rows})
        })
    })
};

exports.save = function (req,res) {
    //var input = JSON.parse(JSON.stringify(req.body));
    var input=req.body;

    req.getConnection(function (err,connection) {

        var data = {
            customerNumber: input.customerNumber,
            customerName: input.customerName,
            contactLastName: input.contactLastName,
            contactFirstName: input.contactFirstName,
            phone: input.phone,
            addressLine1: input.addressLine1,
            addressLine2: input.addressLine2,
            city: input.city,
            state: input.state,
            postalCode: input.postalCode,
            country: input.country,
            salesRepEmployeeNumber: input.salesRepEmployeeNumber,
            creditLimit: input.creditLimit
        };

        var query = connection.query('INSERT INTO customers set ?',data,function (err,rows) {

            if(err)
                console.log(err + "lala");
            res.redirect('/customers');
        })
    });
};

exports.save_edit = function (req, res) {
   // var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.customerNumber;
    var input=req.body;

    var data = {
        customerNumber: input.customerNumber,
        customerName: input.customerName,
        contactLastName: input.contactLastName,
        contactFirstName: input.contactFirstName,
        addressLine1: input.addressLine1,
        addressLine2: input.addressLine2,
        city: input.city,
        postalCode: input.postalCode,
        country: input.country,
        salesRepEmployeeNumber: input.salesRepEmployeeNumber,
        creditLimit: input.creditLimit
    };

    req.getConnection(function (err,connection) {
         connection.query('UPDATE customers set ? WHERE customerNumber  = ?',[data,id],function (err,rows) {
            if (err)
                console.log("Error Updating : %s ",err );
             res.redirect('/customers');
        })
    })
};





exports.delete = function (req,res) {
    var id = req.params.customerNumber;
    req.getConnection(function (err,connection) {
        connection.query('DELETE FROM customers WHERE customerNumber = ? ',[id],function (err,rows) {
            if(err)
                console.log("delete error %s", err);
            res.redirect('/customers');
        })
    })
};




