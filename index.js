const express = require('express');
const connect = require('./server/Database/connection');
const routing = require('./server/routing/route');
const http = require('http');
const morgan = require('morgan')

const { checkIfUserExist  }= require('./utils/validation');
const { generate } = require('./utils/otp');

const bcrypt = require('bcrypt');
const user = require('./server/model/user')




const app = express();
http.createServer(app);
app.use(morgan('tiny'));
app.use(express.json())
app.use('/api/v1/admin',routing);


Port = process.env.Port || 9000;




app.get('/api/v1/users',async(req,res)=>{
    try{
      
      let data = await user.find();
      if(data){
        await res.json({
          UserData : data
        })
      }
      else{
        await res.json({
          status:"fail",
          Reason:"User data is find"
        })
      }
  
  
    }
    catch(err){
      console.log('res')
    }
  })
  
  app.get('/api/v1/user',async(req,res)=>{
    let {email} = req.query;
    try{
  
      let userData = await user.find({
        email
      })
      await res.json({
        status:"success",
        userData
      })
  
    }
    catch(err){
      console.log(err)
      await res.json({
        status:"fail",
        Error:err
      })
    }
  })
  
  app.post('/api/v1/register',async(req,res)=>{
    try{
  
      let {
        Name,
        email,
       Password,
      } = req.body;
  
 
  
      let exist = await checkIfUserExist(email);
  
      if(!exist){
        let hashedPassword = await bcrypt.hash(Password,10);
        console.log(hashedPassword);
         let User = new user( {Name,
          email,
          Password:hashedPassword,
    });
  
           await generate(email);
           await User.save();
          await res.json({
            status:"success",
  
            User:User,
           
          })
      
        }
        else{
            await res.json({
                status:"fail",
                Reason:"User data already present"
            })
        }
        
     
       
      
  
    }
    catch(err){
      console.log(err)
      await res.json({
        status:"fail",
        Error:err
      })
    }
  })
  
  
 
   
  
  
  app.post('/api/v1/login_affilate',async(req,res)=>{
      try{
  
          let { email , password } = req.body;
      
          
          let check = await checkIfUserExist(email)
          if(!check){
              res.send({status:'fail',msg:'Email address  is not registered'})
          }
         
          else{
  
              let User = await user.find({
            
                    email
                  
                });
               
          
                let hashedPassword = await bcrypt.compare(password,User.Pasword);
                if(User.email == email && hashedPassword == true){
  
                  res.json({
                    status:"success",
                    Login:"Login sucessfull"
                  })
  
                }
                else{
                    await res.json({
                        Error:"Please check you credentials"
                    })
                }
            }
      }
      catch(err){
          console.log(err)
          await res.json({
              status:'fail',
              Error:err
          })
      }
  })
  
  
  
           
     
  
  app.post("/api/v1/resend", async (req, res) => {
      try {
        const { email } = req.body;
        console.log(email)
        const send_otp_status = await generate(email);
        return res.json({ status: send_otp_status });
      } catch (error) {
        console.log(error);
        res.json({
          status: "failure",
        });
      }
    });
  
  
    app.post('/api/v1/forget_password',async(req,res)=>{
      try{
  
        let {email,password} = req.body;
  
        let User = await user.find({
    
            email
          
        })
  
        if(User){
          let otp = await generate(email);
          User.otp=otp;
           
          User.Pasword =await bcrypt.hash(password,10);
          await User.save();
          await res.json({
          pass:"Password updated successfully"
          })
        }
        else{
          await res.json({
            status:"fail",
            Reason:"Oops Email address is not found"
          })
        }
  
      }
      catch(err){
        console.log(err)
        await res.json({
          status:"fail",
          Error:err
        })
      }
    })
















app.listen(Port,()=>{
    console.log(`Server is started at port ${Port}`);
    new connect();
})