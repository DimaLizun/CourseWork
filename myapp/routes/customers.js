
exports.list = function (req,res) {
    req.getConnection(function (err,connection) {
        var query = connection.query('SELECT * FROM customers', function (err, rows) {
            if (err)
                console.log("ERROR" + err);
            res.render('customers',{page_title:"Customers - Node.js", data:rows});
        });
    });
}