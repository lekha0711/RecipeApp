import React from 'react'
import Rootlayout from './components/rootlayout/Rootlayout'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from './components/home/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import './App.css'
import UserProfile from './components/userprofile/UserProfile';
import Desserts from './components/desserts/Desserts';
import CurriesRotis from './components/curries-rotis/CurriesRotis';
import Snacks from './components/snacks/Snacks';
import Milkshakes from './components/milkshakes/Milkshakes';
import RiceItems from './components/riceitems/RiceItems';
import Breakfast from './components/breakfast/Breakfast';
import Addrecipe from './components/addrecipe/Addrecipe';

function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Rootlayout />,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/login",
          element:<Login />
        },
        {
          path:"/signup",
          element:<Signup />
        },
        {
          path:"/user-profile",
          element:<UserProfile />
        },
        {
          path:"/desserts",
          element:<Desserts />
        },
        {
          path:"/curries-rotis",
          element:<CurriesRotis/>
        },
        {
          path:"/breakfast",
          element:<Breakfast/>
        },
        {
          path:"/milkshakes",
          element:<Milkshakes/>
        },
        {
          path:"/snacks",
          element:<Snacks/>
        },
        {
          path:"/riceitems",
          element:<RiceItems/>
        },
        {
          path:"/addrecipe",
          element:<Addrecipe/>
        },
      ]
    }
  ])
  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  )
}

export default App
