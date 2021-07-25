const user  = require('../server/model/user');


let checkIfUserExist = async (email)=>{
    
     user.find({
     
         email:email
     
 },function (err,result){
     if(err) {console.log(err)}
else{
    console.log(result)
}
 });
};



module.exports = {
    checkIfUserExist
}