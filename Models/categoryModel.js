import  mongoose from "mongoose";
const { model , Schema } = mongoose;

const categorySchema = new Schema({
    animals: [String],
} , {versionKey:false} );

const Category = model("Category" , categorySchema);
export default Category;