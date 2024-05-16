import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Vote from "./pages/Vote";
import Prompt from "./pages/Prompt";
import Scoreboard from "./pages/Scoreboard";
import Login from "./pages/Login";

const api_url = "http://localhost:8000";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Layout /></>}>
          <Route index element={<MainPage />}/>
          <Route path="vote" element={<Vote />}/>
          <Route path="prompt" element={<Prompt />} />
          <Route path="scoreboard" element={<Scoreboard />} />
          <Route path="login" element={<Scoreboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function MainPage() {
  return (
    <div className="MainPage">
      <div className = "grid-center-container">
        <h1 className="text-3xl font-bold mb-6">Welcome to imPROMPTu</h1>
        <FillInAnimation/>
        <Spacer size="10px" />
        <form action="http://localhost:8000/prompt" method="post">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">start playing!</button>
        </form>
      </div>
    </div>
  );
}

function Spacer({ size = '20px' }) {
  return <div style={{ margin: size }}></div>; // Adjust size as needed
}


function FillInAnimation(){
  const [displayText, setDisplayText] = useState("");
  const [responses, setResponses] = useState([]);
  const [index, setIndex] = useState(0);
  const [currStr, setCurrStr] = useState(0);
  const [deleting, setDeleting] = useState(false)
  const [delay, setDelay] = useState(100);

  useEffect(() => {
    //send request
    axios.get(`${api_url}/landing/animation`).then((res, err) => {
      console.log(res);
      setResponses(res.data.responses);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (responses.length==0) return;
      if (deleting) {
        if (index===0){
        setDeleting(false)
        setDelay(600)
        setCurrStr((currStr + 1) % responses.length)
        } else {
          setDisplayText(responses[currStr].substring(0,index - 1))
          setDelay(50)
          setIndex(index-1)
        }
      } else {
        if (index === responses[currStr].length){
          setDeleting(true)
          setDelay(1250)
        } else {
          setDisplayText(responses[currStr].substring(0,index + 1))
          setIndex(index + 1)
          setDelay(100)
        }
      }
    }, delay);
    return ()=> clearInterval(intervalId)
})
  return (
    //I threw in this character: "‌‌ " to prevent the box from collapsing
    //this is not a whitespace!!!
    <div className="sim-input-box">
      ‌‌ {displayText}{(index===0||index===responses[currStr].length) ? "":"|"}
    </div>
  )
}

export default App;
