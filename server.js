//create express application
const { response, request } = require("express")
const exp=require("express")
const app=exp()
require('dotenv').config()
const port=process.env.PORT||3500
const cors = require('cors')

//assign port number
app.listen(port,()=>console.log(`web server listening in port ${port}...`))

app.use(cors());
//connect react build
const path=require("path")
app.use(exp.static(path.join(__dirname,'./build')))

// get mongodb client
const mclient=require('mongodb').MongoClient

//connect mongo client to mongodb server
mclient.connect('mongodb://0.0.0.0:27017').then((dbRef)=>{
    //connect to a database
   const dbObj= dbRef.db('recipesdb')
   //connect to collections of sample database
   const userCollectionObj=dbObj.collection('userscollection')
   const recipeCollectionObj=dbObj.collection('recipescollection')
   const favoriteCollectionObj=dbObj.collection('favoritescollection')
   const commentsCollectionObj=dbObj.collection('commentscolelction')
   //share collection to api's
   app.set('userCollectionObj',userCollectionObj)
   app.set('recipeCollectionObj',recipeCollectionObj)
   app.set('favoriteCollectionObj',favoriteCollectionObj)
   app.set('commentsCollectionObj',commentsCollectionObj)
   console.log("DB connection success")
})
.catch(err=>console.log("database connection error :",err))


//importing user api 
const userApp=require("./APIs/usersapi")
const recipeApp=require("./APIs/recipesapi")


//execute userapi when the path is user-api
app.use('/user-api',userApp)

//execute recipeapi when the path is recipe-api
app.use('/recipe-api',recipeApp)


//middleware to deal with page refresh
const pageRefresh=(request,response,next)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("/*",pageRefresh)

//invalid path dealing middleware
const invalidPathMiddleware=(request,response,next)=>{
    response.send({message:"invalid path"})
}
app.use("*",invalidPathMiddleware)

//error handling middleware
const errHanhandlingMiddleware=(error,request,response,next)=>{
    response.send({message:error.message})

}
app.use(errHanhandlingMiddleware)


