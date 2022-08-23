
const connectDB = (mongoose)=>{
   mongoose.connect(process.env.DATABASE_URI, {
       useNewUrlParser:true, useUnifiedTopology: true
   })
   //if it successful
   .then((result) => console.log("Connected to DB"))
   //else I will catch the error
   .catch((err) => console.log(err));
}

module.exports = connectDB;