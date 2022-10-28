require('dotenv').config();
import mongoose from 'mongoose';

exports.connect = function(where){
    let uri = process.env.DB_URI;
    if(where==='test') uri = process.env.TESTDB_URI;
    if(process.env.CI) uri = 'mongodb+srv://Barbara-K-322:Loyola-2023@cluster0.lvagtqb.mongodb.net/SoccerApp?retryWrites=true&w=majority';

    mongoose.connect(uri,function(err){
        if(err) console.log(err);
    });
}

exports.disconnect = async function(){
    await mongoose.connection.close();
}
