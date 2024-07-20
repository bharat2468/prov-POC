import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim: true,
		index: true,
    },
    featuredImage: {
			type: String,
			required: true,
	},
    tags:[
        {
            type:String,
        }
    ],
    timeToRead:{
        type: Number,
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
},{
    timestamps:true
});

export const Post = mongoose.model("Post", postSchema);
