import Category from "../Models/categoryModel.js";
import express from "express";

const router = express.Router();

router.get('/editCategories' , async (req,res) => {
    res.render("Pages/editCatergoriesPage.ejs");
});

router.get('/' , async (req,res) => {
    res.send(await Category.find({}));
})

router.post('/', async (req,res) => {
    
    const categoriesRaw = await Category.find({});
    let animals = categoriesRaw[0].animals;
    const id = categoriesRaw[0]._id;

    const met = req.body.method;
    const animal = req.body.category;

    if(met === "patch")
    {
        animals.push(animal);
        animals.sort();
        await Category.findByIdAndUpdate({_id:id} , { animals:animals});
    }
    else
    {   
        let result = [];
        
        animals.forEach( (el) => {
            if(el !== animal)
            {
                result.push(el);
            }
        });


        await Category.findByIdAndUpdate({_id:id} , { animals:result});
    }
    res.redirect("/home");
});

export default router;

