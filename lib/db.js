import mongoose from "mongoose";

export async function connectDB(){
    if(mongoose.connection.readyState >= 1){
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected");
    }
    catch(e){
        console.log("Database Connection Error ", e);
    }
}