const mongoose = require('mongoose')

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.DB_URI)

        const connection = mongoose.connection

        connection.on("Connected!",()=>{
            console.log("Connected to DB")
        })

        connection.on('Error',(err)=>{
            console.log("Something with DB went wrong",err)
        })
    }catch(err){
        console.log("Something went wrong",err)
    }
}

module.exports = connectDB