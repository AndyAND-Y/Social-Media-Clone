import  mongoose from "mongoose";
const { model , Schema } = mongoose;

const postSchema = new Schema({
    
    title:
    {
        type: String,
        required:true,
    },
    animal:
    {
        type: String,
        required: true,
    },
    name:
    {
        type: String,
        required: true,
    },
    owner:
    {
        type:String,
    },
    addDate:
    {
        type: Date,
        default : Date.now(),
    },
    description:
    {
        type: String,
    },
    mood:
    {
        type: String,
    },
    image:
    {
        data : { type:Buffer , required:true },
        contentType: { type:String, required:true , default: 'image/png'}
    },
    
},{ versionKey: false });

const Post = model("Post" , postSchema);
export default Post;
