const uniform = require('../model/modelUniform');
const statinary = require('../model/modelStationary');

const Products = require('../controller/admin');
const router = require('express').Router();

router.route('/add_Item').post(Products.addItem);
router.route('/update_Item').post(Products.updateItem);
router.route('/delete_Item').get(Products.delete_Item);
router.route('/find_Item').get(Products.findSingleUser);

router.route('/all_item').get(async(req,res)=>{

    try{

        let uniform_Item = await uniform.find();
        let statinary_item = await statinary.find();
        await res.json({
            status:"success",
            uniform_Item,
            statinary_item
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

module.exports = router;