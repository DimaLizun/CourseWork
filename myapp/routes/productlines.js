
/**
 * Created by Lizun on 07.12.2016.
 */

exports.list = function (req,res) {
    req.getConnection(function (err,connection) {
        var query = connection.query('SELECT * FROM productlines', function (err, rows) {
            if (err)
                console.log("ERROR" + err);
            res.render('productlines',{page_title:"orders", data:rows});
        });
    });
};

exports.add = function(req, res){
    res.render('products',{page_title:"Add offices"});
};

exports.edit  = function (req,res) {
    var id = req.params.productLine;
    req.getConnection(function (err,connection) {
        var query  = connection.query('SELECT * FROM productlines WHERE productLine = ?',[id],function (err,row) {
            if(err)
                console.log("edit error %s", err);

            res.render('edit_productlines',{page_title: "edit", data: row})
        })
    })
};


exports.save = function (req,res) {

    var input=req.body;

    var data = {
        productLine: input.productLine,
        textDescription: input.textDescription
    };

    req.getConnection(function (err,connection) {
        var query = connection.query('INSERT INTO productlines set ?',[data],function (err,rows) {
            if(err)
                console.log("edit error %s", err);
            res.redirect('/productlines')
        })
    })
};

exports.save_edit = function (req, res) {

    var input=req.body;
    var id = req.params.productLine;

    var data = {
        productLine: input.productLine,
        textDescription: input.textDescription
    };

    req.getConnection(function (err,connection) {
        connection.query('UPDATE productlines set ? WHERE productLine = ?',[data,id],function (err,rows) {
            if (err)
                console.log("Error Updating : %s ",err );
            res.redirect('/productlines');
        })
    })
};

exports.delete = function (req,res) {
    var id = req.params.productLine;
    req.getConnection(function (err,connection) {
        connection.query('DELETE FROM productlines WHERE productLine = ? ',[id],function (err,rows) {
            if(err)
                console.log("delete error %s", err);
            res.redirect('/productlines');
        })
    })
};



