import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {IoFastFoodSharp} from 'react-icons/io5'
function Home() {
  const navigate=useNavigate()
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  let gotoDesserts=()=>{
    navigate('/desserts')
  }
  let gotoCurriesRoties=()=>{
    navigate('/curries-rotis')
  }
  let gotoSnacks=()=>{
    navigate('/snacks')
  }
  let gotoMilkshakes=()=>{
    navigate('/milkshakes')
  }
  let gotoRiceItems=()=>{
    navigate('/riceitems')
  }
  let gotoBreaksfast=()=>{
    navigate('/breakfast')
  }
  return (
    <div className='home'>
      <p className='display-3 text-center quote'>No one is born a great cook, one learns by doing</p>
      <img src="https://i.gifer.com/VhrU.gif" width="70px" height="70px" alt=""/>
      <p className='mt-4'>Welcome to your ultimate destination for culinary inspiration! Whether you're an experienced chef or a cooking enthusiast, our app is designed to ignite your passion for creating delicious dishes right in your kitchen. Discover an extensive array of mouthwatering recipes, thoughtfully curated from around the world, and embark on a culinary journey like no other. From quick and easy weekday meals to impressive gourmet creations, our app provides step-by-step instructions, helpful tips, and stunning visuals to guide you every step of the way. Join our vibrant community of food lovers, share your own creations, and unlock a world of flavors at your fingertips. Get ready to elevate your cooking skills and savor the joy of preparing extraordinary meals with our recipes collection app.</p>
      <Carousel activeIndex={index} onSelect={handleSelect} className='mt-4'>
      <Carousel.Item>
        <img
          className="d-block w-100 mx-auto"
          src="https://www.cookwithkushi.com/wp-content/uploads/2021/11/BeFunky-collagessss-1.jpg"
          alt="First slide"
          height="350px"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 mx-auto"
          src="https://www.licious.in/blog/wp-content/uploads/2022/06/shutterstock_1660752256.jpg"
          alt="Second slide"
          height="350px"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 mx-auto"
          src="https://cdn.scrambledchefs.com/wp-content/uploads/2023/02/21-rice-cooker-recipes-fb.jpg"
          alt="Third slide"
          height="350px"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 mx-auto"
          src="https://static.india.com/wp-content/uploads/2015/05/10-snacks.jpg?impolicy=Medium_Resize&w=1200&h=800"
          alt="First slide"
          height="350px"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 mx-auto"
          src="https://blogscdn.thehut.net/wp-content/uploads/sites/480/2019/03/12092700/milkshake-and-smoothies-header-1200x672.jpg"
          alt="First slide"
          height="350px"
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 mx-auto"
          src="https://ingmar.app/blog/wp-content/uploads/2015/12/Christmas-desserts-around-the-world.jpg"
          alt="First slide"
          height="350px"
        />
        
      </Carousel.Item>
    </Carousel>
    <p className='display-4 cat '>Try out our categories!</p>
<div className='card-container mt-4'>
    <div className="card shadow bg-light">
      <img src="https://imgmedia.lbb.in/media/2022/07/62e15ba414d14f1a110d62f9_1658936228706.jpg" className="card-img-top" alt="..."/>
      <div className="card-body text-center">
        <h5 className="card-title">Breakfast</h5>
        <p className="card-text">Breakfast is everything. The beginning, the first thing. It is the mouthful that is the commitment to a new day, a continuing life</p>
        <button onClick={gotoBreaksfast} className='btn btn-warning '>View dishes <IoFastFoodSharp/></button>
      </div>
    </div>
 
    <div className="card shadow bg-light">
      <img src="https://static.toiimg.com/photo/74698609.cms" className="card-img-top" alt="..."/>
      <div className="card-body text-center">
        <h5 className="card-title">Curries and Roties</h5>
        <p className="card-text">Crispy on the outside, fluffy on the inside, you can always trust in roti prata to hit the right spot every time. If any dish deserves to be called global, it is curry.</p>
        <button onClick={gotoCurriesRoties} className='btn btn-warning '>View dishes <IoFastFoodSharp/></button>
      </div> 
  </div>
  

    <div className="card shadow bg-light">
      <img src="https://www.indianhealthyrecipes.com/wp-content/uploads/2020/12/fried-rice-500x375.jpg" className="card-img-top" alt="..."/>
      <div className="card-body text-center">
        <h5 className="card-title">Rice items</h5>
        <p className="card-text">Rice is versatile, healthy, and delicious, and these easy rice recipes are here to prove it!</p>
        <button onClick={gotoRiceItems} className='btn btn-warning '>View dishes <IoFastFoodSharp/></button>
      </div>   
    </div>


    <div className="card shadow bg-light">
      <img src="https://media.istockphoto.com/id/1159174187/photo/pizza-quattro-formaggi-on-the-rome-dough.jpg?s=612x612&w=0&k=20&c=qN8pOqBuyHRvZMYknDMh20UjaKayN1omZzqFX34Q99g=" className="card-img-top" alt="..." />
      <div className="card-body text-center">
        <h5 className="card-title">Snacks</h5>
        <p className="card-text">Ready. Set. Nibble these delicious, wholesome treats that are as fun to give as they are to eat</p>
        <button onClick={gotoSnacks} className='btn btn-warning'>View dishes <IoFastFoodSharp/></button>
      </div>  
    </div>

 
    <div className="card shadow bg-light">
      <img src="https://static.toiimg.com/photo/84226147.cms" className="card-img-top" alt="..." />
      <div className="card-body text-center">
        <h5 className="card-title">Milkshakes and Juices</h5>
        <p className="card-text">Nothing is more refreshing than a chilled glass of fresh fruit juice or a creamy milkshake. Enjoy a chilled glass of fresh juices, or polish off smooth and creamilicious milkshakes in a jiffy</p>
        <button onClick={gotoMilkshakes} className='btn btn-warning '>View dishes <IoFastFoodSharp/></button>
      </div>  
    </div>


    <div className="card shadow bg-light">
      <img src="https://img.taste.com.au/daP3GJEE/taste/2016/11/white-chocolate-and-cake-pop-ice-cream-dessert-69514-1.jpeg" className="card-img-top" alt="..." />
      <div className="card-body text-center">
        <h5 className="card-title">Desserts</h5>
        <p className="card-text">Desserts spelled backwards is stressed, but these recipes keep the stress levels low and the deliciousness high.</p>
        <button onClick={gotoDesserts} className='btn btn-warning '>View dishes <IoFastFoodSharp/></button>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Home