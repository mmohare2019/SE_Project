const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const AdminSchema = new Schema({
    first_name : {type: String, required: true, maxLength: 100},
    last_name : {type: String, required: true, maxLength: 100},
    email : { type: String, required: true},
    password : {type: String, required: true}
});

/*
// make sure name field isn't empty 
AdminSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.first_name && this.last_name) {
      fullname = `${this.last_name}, ${this.first_name}`;
    }
    if (!this.first_name || !this.last_name) {
      fullname = "";
    }
    return fullname;
});
*/

module.exports = mongoose.model("Admin", AdminSchema);
