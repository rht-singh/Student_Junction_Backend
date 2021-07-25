

const stationary = require('../model/modelStationary');
const uniform = require('../model/modelUniform');


class SellProducts{

    async addItem(req,res){


        try{

            let data =  req.body;
            if(data){
              let obj = Object.keys(data);
              for(let i of obj){
                if(i=="book" || i=="Pen" || i=="Pencil" || i=="Notebook"|| i=="Sample_Paper" || i=="Bag"){
                    let add =   new stationary(data);
                    
                    add.save().then((data)=>{
                        res.json({
                            status:"success",
                            Item:data
                        })
                    }).catch((err)=>{
                        res.json({
                            status:"fail",
                            Error:err
                        })
                    })
                    
                }
                else{
                    let add =  new uniform(data);
                   add.save()
                    .then((data)=>{
                        res.json({
                            status:"success",
                            Item:data
                        })
                    })
                        .catch((err)=>{
                            res.json({
                                status:"fail",
                                Error:err
                            })
                        
                    })
                }
              }
               
              
            }
            else{
                await res.json({
                    status:"fail",
                    Reason:"No data found"
                })
            }

        }
        catch(err){
            console.log(err)
            await res.json({
                Status:"fail",
                Error:err
            })
        }


    }

    async updateItem(req,res){
        try{

            let data =  req.body;
            if(data){
              let obj = Object.keys(data);
              for(let i of obj){
                if(i=="book" || i=="Pen" || i=="Pencil" || i=="Notebook"|| i=="Sample_Paper" || i=="Bag"){
                   
                    
                     stationary.findOneAndUpdate({book:"Mathematics"},{
                        book:data.book
                    },{new:true}).then((data)=>{
                        res.json({
                            status:"success",
                            Item:data
                        })
                    }).catch((err)=>{
                        res.json({
                            status:"fail",
                            Error:err
                        })
                    })
                    
                }
                else{
                   uniform.findOneAndUpdate({name:"shirt"},{
                    name:data.name
                },{new:true})
                    .then((data)=>{
                        res.json({
                            status:"success",
                            Item:data
                        })
                    })
                        .catch((err)=>{
                            res.json({
                                status:"fail",
                                Error:err
                            })
                        
                    })
                }
              }
               
              
            }
            else{
                await res.json({
                    status:"fail",
                    Reason:"No data found"
                })
            }

        }
        catch(err){
            console.log(err)
            await res.json({
                Status:"fail",
                Error:err
            })
        }


    }

    async delete_Item(req,res){
        try{
            let {id} = req.query;
            let delete_item = await uniform.findOneAndRemove({_id:id});
            await res.json({
                status:"success",
                delete_item
            })
        }
        catch(err){
            await res.json({
                status:"fail",
                Error:err
            })
        }
    }

    async findSingleUser(req,res){
        try{
        let {id} = req.query;

        let singleUser = await uniform.findById({
            _id:id
        });
        await res.json({
            status:"success",
            singleUser

        })
          

        }
        catch(err){
            await res.json({
             status:"fail",
             Error:err
            })
        }
    }


}


module.exports = new SellProducts();
