import express from "express";

const router = express.Router();

router.get('/' , (req,res)=>{
    res.render('Pages/aboutPage');
});

export default router;