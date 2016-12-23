/**
 * Created by Lizun on 07.12.2016.
 */

exports.list = function (req,res) {
    req.getConnection(function (err,connection) {
        var query = connection.query('SELECT * FROM employees', function (err, rows) {
            if (err)
                console.log("ERROR" + err);
            res.render('employees',{page_title:"employees - Node.js", data:rows});
        });
    });
};

exports.add = function(req, res){
    res.render('add_employees',{page_title:"Add employees"});
};

exports.edit  = function (req,res) {
    var id = req.params.employeeNumber;
    req.getConnection(function (err,connection) {
        var query  = connection.query('SELECT * FROM employees WHERE employeeNumber = ?',[id],function (err,row) {
            if(err)
                console.log("edit error %s", err);

            res.render('edit_employees',{page_title: "edit", data: row})
        })
    })
};


exports.save = function (req,res) {
    var input=req.body;

    var data = {
        employeeNumber: input.employeeNumber,
        lastName: input.lastName,
        firstName: input.firstName,
        extension: input.extension,
        email: input.email,
        officeCode: input.officeCode,
        reportsTo: input.reportsTo,
        jobTitle: input.jobTitle
    };

    req.getConnection(function (err,connection) {
        var query = connection.query('INSERT INTO employees set ?',[data],function (err,rows) {
            if(err)
                console.log("edit error %s", err);
            res.redirect('/employees');
        })
    })
};

exports.save_edit = function (req, res) {

    var id = req.params.employeeNumber;
    var input=req.body;
    var data = {
        employeeNumber: input.employeeNumber,
        lastName: input.lastName,
        firstName: input.firstName,
        extension: input.extension,
        email: input.email,
        officeCode: input.officeCode,
        reportsTo: input.reportsTo,
        jobTitle: input.jobTitle
    };

    req.getConnection(function (err,connection) {
        connection.query('UPDATE employees set ? WHERE employeeNumber = ?',[data,id],function (err,rows) {
            if (err)
                console.log("Error Updating : %s ",err );
            res.redirect('/employees');
        })
    })
};




exports.delete = function (req,res) {

    var id = req.params.employeeNumber;

    req.getConnection(function (err,connection) {
        connection.query('DELETE FROM employees WHERE employeeNumber = ? ',[id],function (err,rows) {
            if(err)
                console.log("delete error %s", err);
            res.redirect('/employees');
        })
    })
};




