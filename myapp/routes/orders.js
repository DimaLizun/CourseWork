
/**
 * Created by Lizun on 07.12.2016.
 */


exports.list = function (req,res) {
    req.getConnection(function (err,connection) {
        var query2 = connection.query('SELECT customerNumber FROM customers', function (err,cus) {
            if (err)
                console.log("ERROR" + err);
            var query = connection.query('SELECT * FROM orders', function (err,pay) {
                if (err)
                    console.log("ERROR" + err);
                var data={page_title:"employees", data:pay,cust:cus};

                res.render('orders',data);
            });
        });
    });
};



exports.add = function(req, res){
    res.render('orders',{page_title:"Add offices"});
};

exports.edit  = function (req,res) {
    var id = req.params.orderNumber;
    req.getConnection(function (err,connection) {
        var query  = connection.query('SELECT * FROM orders WHERE orderNumber = ?',[id],function (err,row) {
            if(err)
                console.log("edit error %s", err);

            res.render('edit_orders',{page_title: "edit", data: row})
        })
    })
};


exports.save = function (req,res) {

    var input=req.body;

    var data = {
        orderNumber: input.orderNumber,
        orderDate: input.orderDate,
        requiredDate: input.requiredDate,
        shippedDate: input.shippedDate,
        status: input.status,
        comments: input.comments,
        customerNumber: input.customerNumber
    };

    req.getConnection(function (err,connection) {
        var query = connection.query('INSERT INTO orders set ?',[data],function (err,rows) {
            if(err)
                console.log("edit error %s", err);
            res.redirect('/orders')
        })
    })
};

exports.save_edit = function (req, res) {

    var input=req.body;
    var id = req.params.orderNumber;

    var data = {
        orderNumber: input.orderNumber,
        orderDate: input.orderDate,
        requiredDate: input.requiredDate,
        shippedDate: input.shippedDate,
        status: input.status,
        comments: input.comments,
        customerNumber: input.customerNumber
    };

    req.getConnection(function (err,connection) {
        connection.query('UPDATE orders set ? WHERE orderNumber = ?',[data,id],function (err,rows) {
            if (err)
                console.log("Error Updating : %s ",err );
            res.redirect('/orders');
        })
    })
}

exports.delete = function (req,res) {
    var id = req.params.orderNumber;
    req.getConnection(function (err,connection) {
        connection.query('DELETE FROM orders WHERE orderNumber = ? ',[id],function (err,rows) {
            if(err)
                console.log("delete error %s", err);
            res.redirect('/orders');
        })
    })
};


