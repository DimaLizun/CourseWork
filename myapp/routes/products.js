
/**
 * Created by Lizun on 07.12.2016.
 */

exports.list = function (req,res) {
    req.getConnection(function (err,connection) {
        var query = connection.query('SELECT * FROM products', function (err, rows) {
            if (err)
                console.log("ERROR" + err);
            res.render('products',{page_title:"orders", data:rows});
        });
    });
};

exports.add = function(req, res){
    res.render('products',{page_title:"Add offices"});
};

exports.edit  = function (req,res) {
    var id = req.params.productCode;
    req.getConnection(function (err,connection) {
        var query  = connection.query('SELECT * FROM products WHERE productCode = ?',[id],function (err,row) {
            if(err)
                console.log("edit error %s", err);

            res.render('edit_products',{page_title: "edit", data: row})
        })
    })
};


exports.save = function (req,res) {

    var input=req.body;

    var data = {
        productCode: input.productCode,
        productName: input.productName,
        productLine: input.productLine,
        productScale: input.productScale,
        productVendor: input.productVendor,
        productDescription: input.productDescription,
        quantityInStock: input.quantityInStock,
        buyPrice: input.buyPrice,
        MSRP: input.MSRP
    };

    req.getConnection(function (err,connection) {
        var query = connection.query('INSERT INTO products set ?',[data],function (err,rows) {
            if(err)
                console.log("edit error %s", err);
            res.redirect('/products')
        })
    })
};

exports.save_edit = function (req, res) {

    var input=req.body;
    var id = req.params.productCode;

    var data = {
        productCode: input.productCode,
        productName: input.productName,
        productLine: input.productLine,
        productScale: input.productScale,
        productVendor: input.productVendor,
        productDescription: input.productDescription,
        quantityInStock: input.quantityInStock,
        buyPrice: input.buyPrice,
        MSRP: input.MSRP
    };

    req.getConnection(function (err,connection) {
        connection.query('UPDATE products set ? WHERE productCode = ?',[data,id],function (err,rows) {
            if (err)
                console.log("Error Updating : %s ",err );
            res.redirect('/products');
        })
    })
};

exports.delete = function (req,res) {
    var id = req.params.productCode;
    req.getConnection(function (err,connection) {
        connection.query('DELETE FROM products WHERE productCode = ? ',[id],function (err,rows) {
            if(err)
                console.log("delete error %s", err);
            res.redirect('/products');
        })
    })
};


