
/* jshint esversion:8*/
const mongoose= require("mongoose");
 
const jobSchema = new mongoose.Schema(
    {
      user: {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
      company:{type:String, required: true},
      role:{type : String, required:true},
      status:{
        type:String,
        enum:["Applied","Interview","Selected","Rejected"],
        default:"Applied",
      },
    },
    {timestamp:true}
); 
module.exports=mongoose.model("Job",jobSchema);