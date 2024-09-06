import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { loginContext } from '../../contexts/loginContext';
import {BsBookmarkHeart} from 'react-icons/bs'
import './Breakfast.css'
import { useNavigate } from 'react-router-dom';
import { Button,Form } from "react-bootstrap";
function Breakfast() {
  const navigate=useNavigate()
  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
  let [recipes, setRecipes] = useState([]);
  let [searchQuery, setSearchQuery] = useState('');
  let [filteredRecipes, setFilteredRecipes] = useState([]);
  let [showAllRecipes, setShowAllRecipes] = useState(true);
  //err state
  let [err,setErr]=useState()
  let getBreakfastrecipe=()=>{
    // Fetch all recipes from the backend API
    axios.get('http://localhost:3500/recipe-api/get-recipes')
      .then(response => {
        // Filter recipes with category "breakfast"
        if(response.status===200)
        {
        let breakfastRecipes = response.data.payload.filter(recipe => recipe.category === 'breakfast');
   
          setRecipes(breakfastRecipes);
          setFilteredRecipes(breakfastRecipes);
        }
        else{
          setErr(response.data.message)
          console.log("Error message:", response.data.message);
        }
      })
      .catch(err=> {
        setErr(err.message)
      });
  }
  let handleSearch = () => {
    if (searchQuery !== '') {
      let filtered = recipes.filter(recipe =>
        recipe.dishName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
      setShowAllRecipes(false);
    } else {
      setFilteredRecipes(recipes);
      setShowAllRecipes(true);
    }
  };
  useEffect(() => {
    getBreakfastrecipe()
  }, []);
 let addFav=(favRecipeObj)=>{
  if(userLoginStatus===true)
  {
    favRecipeObj.currentPerson=currentUser.name
  axios.post("http://localhost:3500/recipe-api/favorites",favRecipeObj)
  .then(response=>{
    if(response.status===200){
      console.log('success')
    }
    else{
      setErr(response.data.message)
      console.log("Error message:", response.data.message);
    }
  })
  .catch(err=> {
    setErr(err.message)
  });
}
else{
  navigate('/login')
}
 }
 useEffect(() => {
  handleSearch(); // Update filtered recipes when searchQuery changes
}, [searchQuery]);

  return (
    <div>
      <h1>Breakfast</h1>
      <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for recipes"
              className="me-2"
              aria-label="Search"
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-warning" onClick={handleSearch} >Search</Button>
          </Form>
      { showAllRecipes || filteredRecipes.length !== 0? (filteredRecipes.map(recipe => (
          <div key={recipe._id}>
            <div className="card mb-3 mt-4" >
  <div className="row g-0">
    <div className="col-md-4">
      <img src={recipe.image} className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <p className="card-text"><span className='info'>Name of dish :</span> {recipe.dishName}</p>
        <p className="card-text"><span className='info'>Ingredients :</span> {recipe.ingredients}</p>
        <p className="card-text"><span className='info'>Time taken :</span> {recipe.time}</p>
        <p className="card-text"><span className='info'>Process :</span> {recipe.process}</p>
        <p className="card-text"><span className='info text-end'>Posted by :</span> <img src={recipe.profileImage} className="img-info" alt="..." width="40px" height="40px"/> {recipe.name} </p>
        <button onClick={()=>addFav(recipe)} className='fav' >Add to favourites <BsBookmarkHeart/></button>
       
      </div>
    </div>
  </div>
</div>
          </div>
        ))):(<p className='noPost display-3 text-center'>No posts found</p>)}
    </div>
  );
}

export default Breakfast;
