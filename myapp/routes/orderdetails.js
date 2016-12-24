/**
 * Created by Lizun on 24.12.2016.
 */
/**
 * Created by Lizun on 24.12.2016.
 */




/**
 * Created by Lizun on 07.12.2016.
 */

exports.list = function (req,res) {
    req.getConnection(function (err,connection) {
        var query = connection.query('SELECT * FROM orderdetails', function (err, rows) {
            if (err)
                console.log("ERROR" + err);
            res.render('orderdetails',{page_title:"orders", data:rows});
        });
    });
}

exports.add = function(req, res){
    res.render('orders',{page_title:"Add offices"});
};

exports.edit  = function (req,res) {
    var id = req.params.Id;
    req.getConnection(function (err,connection) {
        var query  = connection.query('SELECT * FROM orderdetails WHERE Id = ?',[id],function (err,row) {
            if(err)
                console.log("edit error %s", err);

            res.render('edit_orderdetails',{page_title: "edit", data: row})
        })
    })
}


exports.save = function (req,res) {

    var input=req.body;

    var data = {
        Id: input.Id,
        orderNumber: input.orderNumber,
        productCode: input.productCode,
        quantityOrdered: input.quantityOrdered,
        priceEach: input.priceEach,
        orderLineNumber: input.orderLineNumber,
    };

    req.getConnection(function (err,connection) {
        var query = connection.query('INSERT INTO orderdetails set ?',[data],function (err,rows) {
            if(err)
                console.log("edit error %s", err);
            res.redirect('/orderdetails')
        })
    })
}

exports.save_edit = function (req, res) {

    var input=req.body;
    var id = req.params.Id;

    var data = {
        Id: input.Id,
        orderNumber: input.orderNumber,
        productCode: input.productCode,
        quantityOrdered: input.quantityOrdered,
        priceEach: input.priceEach,
        orderLineNumber: input.orderLineNumber,
    };

    req.getConnection(function (err,connection) {
        connection.query('UPDATE orderdetails set ? WHERE Id = ?',[data,id],function (err,rows) {
            if (err)
                console.log("Error Updating : %s ",err );
            res.redirect('/orderdetails');
        })
    })
}

exports.delete = function (req,res) {
    var id = req.params.Id;
    req.getConnection(function (err,connection) {
        connection.query('DELETE FROM orderdetails WHERE Id = ? ',[id],function (err,rows) {
            if(err)
                console.log("delete error %s", err);
            res.redirect('/orderdetails');
        })
    })
}


