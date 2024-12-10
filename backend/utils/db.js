import mongoose from "mongoose"

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongodb successfully")
    } catch (error) {
        console.error("error in connecting mongodb:",error.message)
        process.exit(1)
    }
}

export default connectDB