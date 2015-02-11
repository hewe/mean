(function (database){
    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://" + process.env.IP +":27017/theBoard";
    var theDb = null;
    
    database.getDb = function (next) {
        if (!theDb) {
            // connect to database
            mongodb.MongoClient.connect(mongoUrl, function(err, db){
                if(err) {
                    next(err, null);
                } else {
                    theDb = {
                        db: db,
                        notes: db.collection("notes") // gets the notes collection in mongo
                    };
                    next(null, theDb); 
                }
            })
        } else {
            next(null, theDb);
        }
            
    }
})(module.exports);