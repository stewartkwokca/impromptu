import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const api_url = "http://localhost:8000";

const Scoreboard = ({user}) => {

    const [tops, setTops] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [date, setDate] = useState("");

    useEffect (() => {
        setDate(new Date().toDateString());
    }, []);

    useEffect(() => {
        axios.get(`${api_url}/prompt`).then((res, err) => {
            // console.log(res);
            setPrompt(res.data.text);
        }).catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get(`${api_url}/scoreboard`).then((res, err) => {
            // console.log(res);
            setTops(res.data.responses);
        }).catch((err) => {
                console.log(err);
            })
    }, [])

    function updateTops(newDate) {
        axios.get(`${api_url}/scoreboard/${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`).then((res, err) => {
            setTops(res.data.responses);
        }).catch((err) => {
                console.log(err);
            })
    }

    const handlePreviousDateClick = () => {
        const newDate = new Date(Date.parse(date));
        newDate.setDate(newDate.getDate()-1);
        setDate(newDate.toDateString());

        updateTops(newDate);
    }

    const handleNextDateClick = () => {
        const newDate = new Date(Date.parse(date));

        if (newDate.toDateString() == new Date().toDateString()){
            return;
        }

        newDate.setDate(newDate.getDate()+1);
        setDate(newDate.toDateString());

        updateTops(newDate);
    }

    const renderItems = tops.map((content, index) => 
        <div className="border rounded border-black place-content-center">
            <h1 className="mx-8 mt-2 text-lg font-extrabold">{index + 1}</h1> 
            <p className="mx-8 text-sm font-light">@{content.user}</p>
            <p className="mx-8 text-sm font-bold">{content.votes} Votes</p>
            <p className="mx-8 my-2 whitespace-pre-wrap">{content.response}</p>
        </div>
    );

    return (
        <div className="center">
            <div className="place-content-center">
                <h1 className="text-4xl font-bold text-center mb-6">Scoreboard</h1>
                <h2 className="text-2xl text-center mb-5">{prompt}</h2>
                <div className="flex flex-row justify-center items-center">
                    <button onClick={handlePreviousDateClick}><FaArrowCircleLeft size={20}/></button>
                    <h3 className="text-3xl text-center mb-3 mx-5">{date.toString()}</h3>
                    <button onClick={handleNextDateClick}><FaArrowCircleRight size={20}/></button>
                </div>
            </div>

            <div className="mx-20 grid grid-cols-1 gap-4 flex p-5">
                {renderItems}
            </div>
        </div>
    );
}



export default Scoreboard;
