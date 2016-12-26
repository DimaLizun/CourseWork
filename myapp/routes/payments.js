/**
 * Created by Lizun on 07.12.2016.
 */



exports.list = function (req,res) {

    var field=req.query.sorts;

    req.getConnection(function (err,connection) {
        var query2 = connection.query('SELECT customerNumber FROM customers', function (err,cus) {
            if (err)
                console.log("ERROR" + err);

            var query ='SELECT * FROM payments '
                +(field?('order by '+field):'');
            connection.query(query, function (err,pay) {
                if (err)
                    console.log("ERROR" + err);
                var data={page_title:"employees", data:pay,cust:cus};

                res.render('payments',data);
            });
        });
    });
};


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


