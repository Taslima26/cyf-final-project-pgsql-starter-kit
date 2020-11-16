import React, { Fragment, useEffect, useState } from "react";


import "./App.css";
import AddNewPost from "./components/AddNewPost";
import Header from "./components/header";
import Post from "./components/Post";
import ShowAllPost from "./components/ShowAllPost";
import Navbar from "./components/NavBar";
import About from "./Pages/About";
import TopTenBlog from "./Pages/TopTenBlog";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router } from "react-router-dom";
import { HeaderImage } from './public/blog-19.jpg';



const App = () => {
  return (
     //<div className="logo" style={{backgroundImage: `url(${HeaderImage}` }}>
   
    <AuthProvider>
      <Navbar/>
      <Router>
       
     
         <PrivateRoute exact path="/" component={AddNewPost} />
         <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
         
   
      </Router>
      </AuthProvider>
   
      
	);
}

export default App;
