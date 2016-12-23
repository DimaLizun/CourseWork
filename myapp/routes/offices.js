/**
 * Created by Lizun on 07.12.2016.
 */

exports.list = function (req,res) {
    req.getConnection(function (err,connection) {
        var query = connection.query('SELECT * FROM offices', function (err, rows) {
            if (err)
                console.log("ERROR" + err);
            res.render('offices',{page_title:"offices", data:rows});
        });
    });
}

exports.add = function(req, res){
    res.render('offices',{page_title:"Add offices"});
};

exports.edit  = function (req,res) {
    var id = req.params.officeCode;
    req.getConnection(function (err,connection) {
        var query  = connection.query('SELECT * FROM offices WHERE officeCode = ?',[id],function (err,row) {
            if(err)
                console.log("edit error %s", err);

            res.render('edit_offices',{page_title: "edit", data: row})
        })
    })
}


exports.save = function (req,res) {

    var input=req.body;

    var data = {
        officeCode: input.officeCode,
        city: input.city,
        phone: input.phone,
        addressLine1: input.addressLine1,
        addressLine2: input.addressLine2,
        state: input.state,
        country: input.country,
        postalCode: input.postalCode,
        territory: input.territory
    };

    req.getConnection(function (err,connection) {
        var query = connection.query('INSERT INTO offices set ?',[data],function (err,rows) {
            if(err)
                console.log("edit error %s", err);
            res.redirect('/offices')
        })
    })
}

exports.save_edit = function (req, res) {
    var input=req.body;
    var id = req.params.officeCode;

    var data = {
        officeCode: input.officeCode,
        city: input.city,
        phone: input.phone,
        addressLine1: input.addressLine1,
        addressLine2: input.addressLine2,
        state: input.state,
        country: input.country,
        postalCode: input.postalCode,
        territory: input.territory
    };

    req.getConnection(function (err,connection) {
        connection.query('UPDATE offices set ? WHERE officeCode = ?',[data,id],function (err,rows) {
            if (err)
                console.log("Error Updating : %s ",err );
            res.redirect('/offices');
        })
    })
}

exports.delete = function (req,res) {
    var id = req.params.officeCode;
    req.getConnection(function (err,connection) {
        connection.query('DELETE FROM offices WHERE officeCode = ? ',[id],function (err,rows) {
            if(err)
                console.log("delete error %s", err);
            res.redirect('/offices');
        })
    })
}


