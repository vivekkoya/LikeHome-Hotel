import mongoose, { trusted } from 'mongoose';

const pointSchema = mongoose.Schema({
    points: {
        type: Number,
        required: true
    }
})

const rewardCategorySchema = mongoose.Schema({
    category: { //platinum, gold, diamond
        type: String,
        required: true
    }
})


const Reward = mongoose.model('Reward', pointSchema)
export default Reward
