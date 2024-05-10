import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react'

function App() {
  return (
    <div className="App">
      <div className = "grid-center-container">
       <h1>Welcome to imPROMPTtu</h1>
       <FillInAnimation/>
      </div>
      <Spacer size="50px" />
      <button>start playing! </button>
    </div>
  );
}

function Spacer({ size = '20px' }) {
  return <div style={{ margin: size }}></div>; // Adjust size as needed
}


function FillInAnimation(){
  const [displayText, setDisplayText] = useState("");
  const responses = ["the gambling site for children", 
                      "it's like github for lesbians", 
                      "the child of myspace and wordle",
                       "as good as napster for the deaf"]
  const [index, setIndex] = useState(0);
  const [currStr, setCurrStr] = useState(0);
  const [deleting, setDeleting] = useState(false)
  const [delay, setDelay] = useState(100)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (deleting){
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
