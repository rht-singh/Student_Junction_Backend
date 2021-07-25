

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let model = mongoose.model;

let schema = new Schema({
 
    book:{

        type:String
    },
    Pen:{
        type:String
    },
    Pencil:{
        type:String
    },
    Notebook:{
        type:String
    },
    Bag_:{
        type:String
    },
    Sample_Paper:{
        type:String
    }


})


let stationary = model('Stationary_item',schema);

module.exports = stationary;