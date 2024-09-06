import React,{useEffect,useState} from 'react'
import { loginContext } from '../../contexts/loginContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {AiOutlineEye} from 'react-icons/ai'
import {BsTrash3} from 'react-icons/bs'
import './UserProfile.css'
import axios from 'axios'
function UserProfile() {
  const navigate=useNavigate()
  const [recipes, setRecipes] = useState([]);
  const [favRecipes,setFavRecipes]=useState([])
  let [currentUser,loginErr,userLoginStatus,loginUser]=useContext(loginContext)
  const [err,setErr]=useState()

  let gotoAddRecipe=()=>{
    navigate('/addrecipe')
  }
  useEffect(() => {
    // Check if the user is authenticated
    if (!userLoginStatus) {
      navigate('/login'); // Redirect to the login page
    }
  }, [userLoginStatus, navigate]);
 useEffect(()=>{
  fetchUserRecipes()
 },[])
 let fetchUserRecipes=()=>{
  axios.get("http://localhost:3500/recipe-api/get-recipes")
  .then(response=>{
    console.log(response)
    if(response.status===200){
      const userRecipes = response.data.payload.filter(recipe => recipe.name === currentUser.name);
      setRecipes(userRecipes)
    }
    
    else{
      setErr(response.data.message)
          console.log("Error message:", response.data.message);
    }
  })
  .catch(err=>{
    setErr(err.message)
  })
 }
 useEffect(()=>{
  fetchFavRecipes()
 },[])
 let fetchFavRecipes=()=>{
  axios.get("http://localhost:3500/recipe-api/get-fav-recipes")
  .then(response=>{
    console.log(response)
    if(response.status===200){
      let recipesFav = response.data.payload.filter(recipe => recipe.currentPerson === currentUser.name);
      setFavRecipes(recipesFav)
    }
   
    else{
      setErr(response.data.message)
          console.log("Error message:", response.data.message);
    }
  })
  .catch(err=>{
    setErr(err.message)
  })
 }
  let gotoRespectiveCategoryPage=(category)=>{
    navigate(`/${category}`)
  }
  //func to remove card from favorites
  let removeFromFav=(recipeId)=>{
    axios.delete(`http://localhost:3500/recipe-api/delete-favRecipe/${recipeId}`)
    .then(response=>{
      if(response.status===200)
         //console.log("successfully deleted")
        // Update the favRecipes state by filtering out the deleted recipe
          setFavRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id.toString() !== recipeId.toString()));
          
      else{
        setErr(response.data.message)
          console.log("Error message:", response.data.message);
      }  
    })
    .catch(err=>{
      setErr(err.message)
    })
  }
  
  return (
    <div>
      
      <h4 className='text-end'>Welcome, {currentUser.name}</h4>
      <h5 className='text-end text-secondary'><small>{currentUser.email}</small></h5>
      <img src={currentUser.image} width="50px" height="50px" alt="" className='float-end profile' />  
      <p className='description lead'>Welcome to your user profile page! This is your personal space where you can showcase your culinary creations and keep track of your favorite recipes. Here, you can manage and organize your recipes, whether it's breakfast, lunch, dinner, or even desserts. Feel free to explore the various categories, discover new recipes, and share your own culinary masterpieces with the community. Add your favorite recipes and interact with other foodies. Get ready to embark on a delicious journey filled with flavors, creativity, and inspiration. Enjoy the delightful experience of being part of a passionate cooking community. Happy cooking and bon appétit!
</p>
<img src="https://cdn.videoplasty.com/gif/3d-white-male-chef-sign-below-stock-gif-62064-1024x576.gif" alt=".." width='90px' height='80px' className='lookBelow'/>

      <button onClick={gotoAddRecipe} className='btn btn-warning addRecipeButton'>Add recipe</button>
      <h4 className='recipesPostedByMe mt-4'>Recipes posted by you:</h4>
      <div className="card-container">
  {recipes.length !==0 ? (recipes.map(recipe => (
    <div key={recipe._id} className="card p-3">
      <img src={recipe.image} alt="Recipe" className="card-image favo" />
      <div className="card-content text-center">
        <h5><span className='info'>Dish Name:</span> {recipe.dishName}</h5>
        <button onClick={() => gotoRespectiveCategoryPage(recipe.category)} className="btn btn-warning">
          View More <AiOutlineEye/>
        </button>
      </div>
    </div>
  ))):(<p className='lead text-center'>No recipes added by you so far</p>)}
</div>

<h4 className='recipesPostedByMe mt-4'>Your favorites:</h4>
      <div className="card-container">
  { favRecipes.length !==0 ? (favRecipes.map(recipe => (
    <div key={recipe._id} className="card p-3">
      <img src={recipe.image} alt="Recipe" className="card-image favo" />
      <div className="card-content text-center">
        <h5><span className='info'>Dish Name:</span> {recipe.dishName}</h5>
        <button onClick={()=>removeFromFav(recipe._id)} className='btn btn-warning'>Remove from favorites <BsTrash3/></button>
      </div>
    </div>
  ))):(<p className='lead text-center'>No favorites</p>)}
</div>

    </div>)
  
}

export default UserProfile