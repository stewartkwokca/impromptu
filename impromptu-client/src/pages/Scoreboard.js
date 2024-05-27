import axios from 'axios';
import React, { useState, useEffect } from 'react';

const api_url = "http://localhost:8000";

const Scoreboard = () => {
    const [tops, setTops] = useState([]);

    useEffect(() => {
        axios.get(`${api_url}/scoreboard`).then((res, err) => {
            console.log(res);
            setTops(res.data.responses);
        }).catch((err) => {
                console.log(err);
            })
    }, [])

    const renderItems = tops.map((content, index) => 
        <div className="border rounded border-sky-300 first:text-amber-400 place-content-center">
            <h1 className="mx-8 mt-2 text-lg font-extrabold">{index + 1}</h1> 
            <p className="mx-8 text-sm font-light">@{content.user}</p>
            <p className="mx-8 text-sm font-bold">{content.votes} Votes</p>
            <p className="mx-8 my-2">{content.response}</p>
        </div>
    );

    return (
        <div className="center">
            <div className="place-content-center">
                <h1 className="text-2xl font-bold text-center mb-10">Scoreboard</h1>
            </div>
            <div className="mx-20 grid grid-cols-1 gap-4 flex">
                {renderItems}
            </div>
        </div>
    );
}



export default Scoreboard;
