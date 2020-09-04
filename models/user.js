const mongoose = require('mongoose');
// const Schema = mongoose.Schema;  // this line is the same as line 3
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
});

mongoose.model('users', userSchema);
