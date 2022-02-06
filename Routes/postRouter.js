import Post from "../Models/postModel.js";
import Category from "../Models/categoryModel.js";
import express from "express";
import fs from 'fs';
import multer from "multer";
import path from 'path';


async function apartine(target)
{
    const categoryRaw = await Category.find({});
    const category = categoryRaw[0].animals;
    const id = categoryRaw[0]._id;

    let exista = 0;

    for(let i=0;i<category.lenght;++i)
        if(category[i] == target)
        {
            exista = 1;
        }
    return exista;
}
async function getList()
{
    const categoryRaw = await Category.find({});
    const category = categoryRaw[0].animals;
    return category;
}
async function getId()
{
    const categoryRaw = await Category.find({});
    const id = categoryRaw[0].animals;
    return id;
}


const __dirname = path.resolve();
  
const upload = multer({ dest:'uploads/' });

const router = express.Router();

router.get('/' , async (req , res)=>{
    try
    {
        const posts = await Post.find({});
        res.render('Pages/viewCategoryPage' , { posts:posts })
    }
    catch(err)
    {
        res.status(404).send(err);
    }
});

router.get('/category' , async (req , res)=>{
    try
    {
        const posts = await Post.find({});
        res.render('Pages/viewCategoryPage' , { posts:posts })
    }
    catch(err)
    {
        res.status(404).send(err);
    }
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
            animal : req.body.animal.toLowerCase(),
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
        fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename));

        const exista = apartine(obj.name);
        if(exista === 0)
        {   
            let result = getList();
            result.push(obj.name);
            result.sort();
            Category.findByIdAndUpdate({_id:getId()} , {animals:result});
        }

        res.redirect(`/post/single/${post._id}`);
    }
    catch(eroare)
    {
        res.status(400).send(eroare);
    }
    
});

router.get('/single/:id' , async (req,res) => {
    try
    {   
        const post = await Post.find({_id: req.params.id });
        res.render('Pages/postPage' ,{ post:post[0]} );
    }
    catch(err)
    {
        res.status(404).send(err);
    }
} );

router.get('/category/:id' , async(req,res) => {
    try
    {   if(!apartine(req.params.id))
        {
            res.render('Pages/404Page');
        }
        else
        {
            const posts = await Post.find({ animal:req.params.id });
            res.render('Pages/viewCategoryPage' , { posts:posts })
        }
    }
    catch(err)
    {
        res.status(404).send(err);
    }
})

router.get('/single/editPage/:id', async (req,res) => {

    
    const post = await Post.find({_id:req.params.id});

    const obj = 
    {   _id:post[0]._id,
        name:post[0].name,
        title:post[0].title,
        description:post[0].description,
        animal:post[0].animal,
        mood:post[0].mood,
        owner:post[0].owner,
    }

    res.render('Pages/editPage' , {post:obj});

})

router.post('/single/' , upload.single('image') , async (req,res) => {

    const method = req.body.method;

    if(method == "delete")
    {
        try
        {   
            await Post.findByIdAndDelete({_id:req.body.id});
            res.redirect('/post');
        }
        catch(eroare)
        {
            res.send(eroare);
        }
    }
    else if(method == "patch")
    {   
        
        try
        {   
            
            let imgData,image;
            const obj ={
                title : req.body.title,
                animal : req.body.animal.toLowerCase(),
                name : req.body.name,
                owner : req.body.owner,
                description : req.body.description,
                mood : req.body.mood,
            }

            if(req.file)
            {   
                imgData = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename));
                image = {
                    data : imgData,
                    contentType : 'image/png', 
                }
                obj.image = image;
                fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename));
            }
            
            await Post.findOneAndUpdate({_id:req.body.id} , obj);

            const exista = apartine(obj.name);
            if(exista === 0)
            {   
                let result = getList();
                result.push(obj.name);
                result.sort();
                await Category.findByIdAndUpdate({_id:getId()} , {animals:result});
            }

            res.redirect(`/post/single/${req.body.id}`);
        }
        catch(eroare)
        {
            res.status(400).send(eroare);
        }
    }


});


export default router;