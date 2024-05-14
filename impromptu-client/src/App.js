import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react'

const api_url = "http://localhost:8000";

function App() {
  return (
    <div className="App">
      <div className = "grid-center-container">
       <h1>Welcome to imPROMPTtu</h1>
       <FillInAnimation/>
      </div>
      <Spacer size="50px" />
      <form action="http://localhost:8000/prompt" method="post">
        <button type="submit">start playing!</button>
      </form>
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
