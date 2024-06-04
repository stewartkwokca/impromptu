import axios from 'axios';
import React, { useState, useEffect } from 'react';

const api_url = "http://localhost:8000";

const Scoreboard = ({user}) => {
    const [tops, setTops] = useState([]);
    const [prompt, setPrompt] = useState("");

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
                <h1 className="text-2xl font-bold text-center mb-4">Scoreboard</h1>
                <p className="text-lg text-center mb-10">{prompt}</p>
            </div>
            <div className="mx-20 grid grid-cols-1 gap-4 flex p-5">
                {renderItems}
            </div>
        </div>
    );
}



export default Scoreboard;
