(function(data){
    var seedData = require("./seedData");
    var database = require("./database");
    // this defines the getNoteCategories method for data module and 
    // the function takes a delegate to execute next. The delegate 
    // has to take a first parameter for any errors and the results 
    // which is gotten here from seedData.initialNotes
    data.getNoteCategories = function(next){
      next(null, seedData.initialNotes);  
    };
    
    function seedDatabase() {
        database.getDb(function (err, db) {
          if (err) {
            console.log("Failed to seed databaes" + err);
          } else {
            
            // to see if data already exists
            db.notes.count(function(err, count){
              if (err) {
                console.log("failed to retrieve database count");
              } else {
                if (count == 0) {
                  seedData.initialNotes.forEach(function(item){
                    db.notes.insert(item, function(err) {
                      if (err) {
                        console.log("failed to insert note into database")
                      }
                    })
                  })
                }
                else {
                  console.log("Database already  seeded.")
                }
              }
            });
          }
        });
    }
    
    seedDatabase();
    
})(module.exports);