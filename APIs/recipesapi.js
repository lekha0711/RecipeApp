//create mini express api
const exp=require("express");
const recipeApp=exp.Router()
require('dotenv').config()
const expressAsyncHandler=require("express-async-handler")
//body parser
recipeApp.use(exp.json())


//import multerObj
const {recipeMulterObj}=require("./middlewares/cloudinaryConfig");
const verifyToken = require("./middlewares/verifyToken");

//create recipe
recipeApp.post("/create-recipe",recipeMulterObj.single('recipe_photo'),expressAsyncHandler(async(request,response)=>{
 

    //get recipeCollectionObj
    const recipeCollectionObj=request.app.get('recipeCollectionObj')
    //get new recipe from request
    const recipe=JSON.parse(request.body.dish)//converts string to javascript obj again
    //add CDN link of cloudinary image to recipe obj
    recipe.image=request.file.path
    //console.log(recipe)
   //insert recipe
   await recipeCollectionObj.insertOne(recipe)
   //send response
   response.status(200).send({message:"recipe added successfully"})
  }))

  //add recipe to favorite route
  recipeApp.post("/favorites",expressAsyncHandler(async(request,response)=>{
    
  
    //get recipeCollectionObj
    const favoriteCollectionObj=request.app.get('favoriteCollectionObj')
    const recipe=request.body
    await favoriteCollectionObj.insertOne(recipe)
    //send response
    response.status(200).send({message:"recipe added successfully"}) 
  }))

//get fav recipes
recipeApp.get("/get-fav-recipes",expressAsyncHandler(async(request,response)=>{


  //get favrecipeCollectionObj
const favoriteCollectionObj=request.app.get('favoriteCollectionObj')
let favRecipeList=await favoriteCollectionObj.find().toArray()
response.status(200).send({message:"Fav Recipe list",payload:favRecipeList})

}))
  //get recipes
  recipeApp.get("/get-recipes",expressAsyncHandler(async(request,response)=>{
    
  
     //get recipeCollectionObj
   const recipeCollectionObj=request.app.get('recipeCollectionObj')
   let recipeList=await recipeCollectionObj.find().toArray()
   response.status(200).send({message:"Recipe list",payload:recipeList})
  }))

  //get recipes by current username
  recipeApp.get("get-recipes-by-username/:name",expressAsyncHandler(async(request,response)=>{
  
  
    const recipeCollectionObj=request.app.get('recipeCollectionObj')
    let usernameFromUrl=request.params.name
    console.log(request.params.name)
    console.log(usernameFromUrl)
      let recipesList=await recipeCollectionObj.find({name:usernameFromUrl}).toArray()
      console.log(recipesList)
      response.status(200).send({message:"Recipes",payload:recipesList})
  }))

  //delete recipe by id
  recipeApp.delete("/delete-favRecipe/:id",expressAsyncHandler(async(request,response)=>{
    
    //get favrecipeCollectionObj
    const favoriteCollectionObj=request.app.get('favoriteCollectionObj')
    let favRecipeId=(request.params.id)
    //delete favRecipe from dB
   let result=await favoriteCollectionObj.deleteOne({_id:favRecipeId})
   response.status(200).send({message:"Fav recipe removed"})
   
  }))

  

  
module.exports=recipeApp;