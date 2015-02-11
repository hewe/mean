// this pattern creates a self executing annonymous functionrenames the module.exports into homeController so that the user of this module can do the following
// var homeController = require(homeController);
// homecontroller then can call into the functions and properties it defines
(function (homeController) { 
    
    var data = require("../data");
    
    homeController.init = function (app) {
        app.get("/", function(req, res){
            
            // we call into the getNoteCategories method() and pass in a callback delegate
            // which takes erors and results as parameter and within the callback delegate
            // we do response rendering with results or error
            data.getNoteCategories(function(errors, results) {
                    
                    res.render("index", { title : "Express + VASH", error: errors, categories: results });
                    
                });
                
            });
            
    };
})(module.exports);