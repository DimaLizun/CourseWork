/**
 * Created by Lizun on 07.12.2016.
 */

exports.list = function (req,res) {
    req.getConnection(function (err,connection) {
        var query = connection.query('SELECT * FROM payments', function (err, rows) {
            if (err)
                console.log("ERROR" + err);
            res.render('payments',{page_title:"payments", data:rows});
        });
    });
}

exports.add = function(req, res){
    res.render('payments',{page_title:"Add offices"});
};

exports.edit  = function (req,res) {
    var id = req.params.customerNumber;
    req.getConnection(function (err,connection) {
        var query  = connection.query('SELECT * FROM payments WHERE customerNumber = ?',[id],function (err,row) {
            if(err)
                console.log("edit error %s", err);

            res.render('edit_payments',{page_title: "edit", data: row})
        })
    })
}


exports.save = function (req,res) {

    var input=req.body;

    var data = {
        customerNumber: input.customerNumber,
        cusNumber: input.cusNumber,
        paymentDate: input.paymentDate,
        amount: input.amount
    };

    req.getConnection(function (err,connection) {
        var query = connection.query('INSERT INTO payments set ?',[data],function (err,rows) {
            if(err)
                console.log("edit error %s", err);
            res.redirect('/payments')
        })
    })
}

exports.save_edit = function (req, res) {

    var input=req.body;
    var id = req.params.customerNumber;

    var data = {
        customerNumber: input.customerNumber,
        cusNumber: input.cusNumber,
        paymentDate: input.paymentDate,
        amount: input.amount
    };

    req.getConnection(function (err,connection) {
        connection.query('UPDATE payments set ? WHERE customerNumber = ?',[data,id],function (err,rows) {
            if (err)
                console.log("Error Updating : %s ",err );
            res.redirect('/payments');
        })
    })
}

exports.delete = function (req,res) {
    var id = req.params.customerNumber;
    req.getConnection(function (err,connection) {
        connection.query('DELETE FROM payments WHERE customerNumber = ? ',[id],function (err,rows) {
            if(err)
                console.log("delete error %s", err);
            res.redirect('/payments');
        })
    })
}


