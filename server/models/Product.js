const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Product   = new Schema({
  label: { 
    type: String 
  },
  description: {   
    type: String 
 }, 
 category: {
    type: String  
  }, 
  img: { 
   type: String
  },  
  weight :{
    type: String 
  },
  TVA :{
    type: String 
  }, 
  pricettc :{
    type: String 
  },
  tva :{
    type: String 
  },
  proddate :{
    type: String 
  },
  expdate :{
    type: String 
  },
  unity :{
    type: String 
  },
  reduction :{
    type: Number 
  },
  color :{
    type: String 
  }, 
  quantity: {
    type: String
  }  
},{
    collection: 'products'
});

module.exports = mongoose.model('Product', Product);