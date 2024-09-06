import React,{useState,useContext} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { loginContext } from '../../contexts/loginContext'
import './Addrecipe.css'
function Addrecipe() {
  let [currentUser,loginErr,userLoginStatus,loginUser]=useContext(loginContext)
    const navigate=useNavigate()
    let {
        register,
        handleSubmit,
        formState:{errors}
       }=useForm()
       //http req err state
      let [err,setErr]=useState("")
      //file state
      let [selectFile,setSelectFile]=useState(null)
      //newRecipe func
      let newRecipe=(newRecipeObj)=>{
        console.log(newRecipeObj)
        newRecipeObj.name=currentUser.name
        newRecipeObj.profileImage=currentUser.image
        let fd=new FormData()
        fd.append("dish",JSON.stringify(newRecipeObj))//convert javascript obj to string
        fd.append("recipe_photo",selectFile)
        axios.post("http://localhost:3500/recipe-api/create-recipe",fd)
       .then((response)=>{
        if(response.status===200){
            //navigate to user-profile
            navigate('/user-profile')
        }
        if(response.status!=200){
            setErr(response.data.message)
        }
       })
       .catch((err)=>{
        setErr(err.message)
       
      })
     
    }
    const onFileSelect=(e)=>{
        setSelectFile(e.target.files[0])
     }  
     
  return (
    <div>
        <h1 className='display-3 text-center'>Add your recipes</h1>
        <form onSubmit={handleSubmit(newRecipe)} className='shadow bg-light p-5'>
            <div className='mb-3'>
            <label htmlFor='dishName'>Dish name</label>
            <input type="text"  id="dishName" className='form-control' {...register("dishName",{required:true})}/>
            {errors.dishName?.type==="required" && <p className='text-danger'>*this field is required</p>}
            </div>
            <div className='mb-3'>
            <label htmlFor='category'>Category of recipe</label>
            <select {...register('category', { required: true })} id='category'>
        <option value="breakfast">Breakfast</option>
        <option value="snacks">Snacks</option>
        <option value="curries-rotis">Curries & Rotis</option>
        <option value="rice-items">Rice Items</option>
        <option value="milkshakes">Milkshakes and Juices</option>
        <option value="desserts">Desserts</option>
            </select>
            {errors.category?.type==="required" && <p className='text-danger'>*this field is required</p>}
            </div>
            <div className='mb-3'>
            <label htmlfor="ingredients">Ingredients</label>
            <textarea id="ingredients" className='form-control'  {...register("ingredients",{required:true})} />
            {errors.ingredients?.type==="required" && <p className='text-danger'>*this field is required</p>}
            </div>
            <div className='mb-3'>
            <label htmlFor='time'>Time taken</label>
            <input type="text"  id="time" className='form-control' {...register("time",{required:true})}/>
            {errors.time?.type==="required" && <p className='text-danger'>*this field is required</p>}
            </div>
            <div className='mb-3'>
            <label htmlFor='process'>Process</label>
            <textarea id="process" className='form-control'  {...register("process",{required:true})} />
            {errors.process?.type==="required" && <p className='text-danger'>*this field is required</p>}
            </div>
           <div className='mb-3'>
            <label htmlFor='image'>Upload Image of your dish</label>
            <input type="file"  id="image" className='form-control' {...register("image",{required:true})} onInput={onFileSelect}/>
            {errors.image?.type==="required" && <p className='text-danger'>*this field is required</p>}
          </div>  
          <button type="submit" className='p-2  float-end orangeButton'>Submit</button> 
          </form>

    </div>
  )
}

export default Addrecipe