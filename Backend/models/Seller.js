const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const SellerSchema= new Schema({
      sellerId:{
            type:Number,
            required:true,
            unique:true
      },
      name:{
            type:String,
            required:true
      },
      password:{
            type:String,
            required:true
      },
      PhoneNumber:{
            type:Number,
            required:true,
            unique:true
      },
      role:{
            type:String,
            required:true,
            enum:["ROLE_SELLER","ROLE_ADMIN","ROLE_BUYER"],
            default:"ROLE_SELLER"
      }
});

const Seller= mongoose.model("Seller",SellerSchema);
module.exports =Seller;