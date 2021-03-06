exports.list = function (req,res) {

    var param = req.params.sorts;
    var field=req.query.sorts;

    req.getConnection(function (err,connection) {
        var query2 = connection.query('SELECT officeCode FROM offices', function (err, off) {
            if (err)
                console.log("ERROR" + err);

            var query ='SELECT * FROM employees '
                +(field?('order by '+field):'');
            console.log(query);
            connection.query(query, function (err, empl) {
                if (err)
                    console.log("ERROR" + err);

                var data={page_title:"employees", data:empl,offs:off};
                res.render('employees',data);
            });
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




