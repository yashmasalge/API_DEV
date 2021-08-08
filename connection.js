const mongoose = require("mongoose");

const connectToDB = async () => mongoose.connect(process.env.mongodb_url,{
    useNewUrlParser : true,
    useFindAndModify : false,
    useUnifiedTopology : true,
    useCreateIndex : true,
});

module.exports = connectToDB;