const mongoose = require('mongoose');

require('dotenv').config();
const DBSTRING = process.env.DBSTRING;


const connectDB = async () =>{
    try{
        console.log('connecting to data base...');
        await mongoose.connect(DBSTRING, {});
        console.log("connection to database established ✅");

        ///good to have
        mongoose.connection.on('disconnected', ()=> {
            console.warn('DB disconnected. Attempting reconnection');
        });
        mongoose.connection.on('reconnected', () =>{
            console.info('DB reconnected');
        });

        mongoose.connection.on('error', (err)=> {
            console.error('DB connection err:', err)
        });
    } catch (err){
        console.error("Error connecting to db:", err);
        /////good to have
        process.exit(1);
    }
};

module.exports = connectDB;