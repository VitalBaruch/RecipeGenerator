import mongoose from 'mongoose'

const connectMongo = async () => {
    console.log('connecting');
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('DB connencted');
}

export default connectMongo;