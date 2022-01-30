import Post from "../Models/cat-dogModel.js";
import express from "express";
import fs from 'fs';
import multer from "multer";
import path from 'path';
const __dirname = path.resolve();
  
const upload = multer({ dest:'uploads/' });

const router = express.Router();

router.get('/' , async (req , res)=>{
    const animals = await Post.find({});
    res.send(animals);
});

router.get('/createPost' , async (req,res)=>{
    res.render('Pages/createPage');
})

router.post('/', upload.single('image') , async (req, res) => {
    try
    {   
        const imgData = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename));
        const obj ={
            title : req.body.title,
            animal : req.body.animal,
            name : req.body.name,
            owner : req.body.owner,
            description : req.body.description,
            mood : req.body.mood,
            image : 
            {
                data : imgData,
                contentType : 'image/png',
            }
        }
        const post = new Post(obj);
        await post.save();
        await fs.unlinkSync( path.join(__dirname + '/uploads/' + req.file.filename));
        res.send(post);
    }
    catch(err)
    {
        //res.send(req.file);
        res.status(400).send(err);
    }
});

router.get('/:id' , async (req,res) => {
    
    try
    {   
        const post = await Post.find({_id: req.params.id });
        console.log(post[0].image.data.toString("base64"));
        res.render('Pages/postPage' ,{ post:post[0]} );
    }
    catch(err)
    {
        res.status(404).send(err);
    }
} );
router.patch('/:id');
router.delete('/:id');

export default router;