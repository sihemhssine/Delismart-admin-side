const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Category  = new Schema({
 
  name: { 
    type: String 
  },
  description: { 
    type: String 
  },
  image: { 
    type: String 
  }


},{
    collection: 'categories'
});

module.exports = mongoose.model('Category', Category);