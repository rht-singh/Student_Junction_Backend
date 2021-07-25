const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema({
    Name:{
        type:String
    },
    email:{
        type:String
    },
    Password:{
        type:String
    },
    otp:{
        type:String
    }

});

let user = model('user',schema);

module.exports = user;