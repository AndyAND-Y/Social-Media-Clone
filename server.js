import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import postRouter from "./Routes/cat-dogRouter.js";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine' , 'ejs');

app.use(express.static("views"));

app.use('/post', postRouter);

app.use('/test' , (req,res) =>{
    res.render('Pages/test');
});

app.listen(port , () => {
    console.log(`merge serverul pe ${port}`);
    mongoose.connect(process.env.MG_DATABASE);
});