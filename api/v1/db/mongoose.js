var mongoose = require("mongoose");
mongoose.promise = global.promise;


mongoose.connect('mongodb://localhost:27017/Corporative', {useNewUrlParser: true });




module.exports = {mongoose};