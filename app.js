const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB',()=>{
    console.log("DB connected Successfully.");
});

const infoSchema=mongoose.Schema({
    title:String,
    content:String
});
const Article = mongoose.model("article",infoSchema);

app.get("/articles",(req,res)=>{
    Article.find((err,results)=>{
        console.log(results);
    });
});
app.post("/articles",(req,res)=>{
    let newArticle = new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save((err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Added New Entry Successfully.");
            res.redirect("/articles");
        }
    });
});

app.delete("/articles",(req,res)=>{
    Article.deleteMany((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Deleted all Articles Successfully.");
        }
    });
});
app.listen("3000",()=>{
    console.log("Server is Listening at 3000.");
});
