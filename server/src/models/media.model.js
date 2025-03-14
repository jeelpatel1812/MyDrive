import mongoose, {Schema} from 'mongoose';

const mediaSchema = new Schema({
    title: String,
    attachment:{
        type: String
    },
    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    createdAt: Date
}, {timestamp: true})

export const Media = mongoose.model("Media", mediaSchema);