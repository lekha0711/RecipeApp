import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'
function Signup() {
    //navigate hook
  let navigate=useNavigate()
  let {
       register,
       handleSubmit,
       formState:{errors}
      }=useForm()
       //http req err state
      let [error,setErr]=useState(" ")
      //file state
      let [selectFile,setSelectFile]=useState(null)
      let registration=(newUser)=>
      {
       console.log(newUser)
       let fd=new FormData()
       //append newUsdr to from data
       //append selected file to form data
       fd.append("user",JSON.stringify(newUser))//convert javascript obj to string
       fd.append("photo",selectFile)
       //make http post request
      
       axios.post("http://localhost:3500/user-api/user-signup",fd)
       .then((response)=>{
        console.log("Response:", response);
        if(response.status===201){
            //navigate to login
            navigate('/login')
        }
        else{
          setErr(response.data.message)
          console.log("Error message:", response.data.message);
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
    <div className='sign'>
      <h1 className='display-3 text-center'>Register</h1>
        {/*http req err msg*/}
    
        <div className='row'>
       <div className='col-11 col-sm-8 col-lg-6 mx-auto'>
        <form onSubmit={handleSubmit(registration)} className='shadow bg-light p-5'>
            <div className='mb-3'>
            <label htmlFor='name'>Username</label>
            <input type="text"  id="name" className='form-control' {...register("name",{required:true})}/>
            {errors.name?.type==="required" && <p className='text-danger'>*Username is required</p>}
            </div>
            <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input type="password"  id="password" className='form-control' {...register("password",{required:true})}/>
            {errors.name?.type==="required" && <p className='text-danger'>*Password is required</p>}
            </div>
            <div className='mb-3'>
            <label htmlFor='email'>Email</label>
            <input type="text"  id="email" className='form-control' {...register("email",{required:true})}/>
            {errors.email?.type==="required" && <p className='text-danger'>*Email is required</p>}
            </div>
            <div className='mb-3'>
            <label htmlFor='dob'>Date Of Birth</label>
            <input type="date"  id="dob" className='form-control' {...register("dob",{required:true})}/>
            {errors.dob?.type==="required" && <p className='text-danger'>*DOB is required</p>}
            </div>
           <div className='mb-3'>
            <label htmlFor='image'>Upload Image</label>
            <input type="file"  id="image" className='form-control' {...register("image",{required:true})} onInput={onFileSelect}/>
            {errors.image?.type==="required" && <p className='text-danger'>*Image is required</p>}
          </div>  
          <button type="submit" className='p-2  float-end orangeButton'>Register</button> 
          </form>
        </div>
      </div>
    </div>
    
  )
}

export default Signup