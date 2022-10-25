import React from 'react';
import './App.css';
import Header from "./Component/Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from "./Component/StackOverflow/index";
import AddQuestion from "./Component/AddQuestions/AddQuestion";
import Question from "./Component/ViewQuestion/index";
import Auth from "./Component/Auth/index";

function App() {
  return (
   <BrowserRouter>
   <Header/>
      <Routes>
        <Route path='/' element={<Auth/>}></Route>
        <Route path='/stack' element={<Index/>}></Route>
        <Route path='/add-question' element={<AddQuestion/>}></Route>
        <Route path='/question' element={<Question/>}></Route>
        
      </Routes>
   </BrowserRouter>
  );
}

export default App;
