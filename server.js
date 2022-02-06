import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import postRouter from "./Routes/postRouter.js";
import categoryRouter from './Routes/categoryRouter.js';
import aboutRouter from './Routes/aboutRouter.js';
import bodyParser from "body-parser";
import Post from "./Models/postModel.js";
import Category from "./Models/categoryModel.js";


const port = 3000;
const app = express();
const db = mongoose;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine' , 'ejs');

app.use(express.static("views"));

app.use('/post', postRouter);
app.use('/categories' , categoryRouter);
app.use('/about' , aboutRouter);

app.use('/' , async (req,res) => {
    const randomPosts = await Post.aggregate().sample(3);
    const categoriesRaw = await Category.find({});
    const categories  = categoriesRaw[0].animals;
    
    let result = [];

    for(let i=0;i<categories.length;++i)
    {
        result.push({
            name:categories[i],
            count : await Post.countDocuments({ animal:categories[i] }),
        });
    };

    res.render('Pages/homePage' , {posts:randomPosts , categories:result});
});


app.listen(port , () => {
    console.log(`merge serverul pe ${port}`);
    db.connect(process.env.MG_DATABASE);
    
});