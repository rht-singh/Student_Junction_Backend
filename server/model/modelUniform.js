
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let model = mongoose.model;

const schema = new Schema({
  
   name:{
       type:String,
       
   },
   School_name:{
       type:String
   },
   Season:{
       type:String
   },
   Dress_Code:{
    type:String
   },
   total_item:{
       type:Number
   }
});

let data = model('uniform',schema);
module.exports=data;