import axios from 'axios'
import { useState, useEffect } from 'react';

const api_url = "http://localhost:8000"


const Vote = ({user}) => {
    const [feed, setFeed] = useState([]);
    const [prompt, setPrompt] = useState("");
    
    useEffect(() =>{
        axios.get(`${api_url}/feed`).then((res, err) => {
            console.log(res)
            setFeed(res.data.responses)
        }).catch((err) => {
            console.log(err)
        })
    })

    useEffect(() => {
        axios.get(`${api_url}/prompt`).then((res, err) => {
            console.log(res)
            setPrompt(res.data.text)
        }).catch((err) => {
            console.log(err)
        })
    })



    const renderItems = feed.map((content) => 
        <div className="border rounded border-sky-300 place-content-center">
            <p className="mx-8 my-2 text-sm font-light">@{content.user}</p>
            <p className="mx-8 my-2">{content.response}</p>
            <form action="http://localhost:8000/vote" method="post">
                <button class="mx-8 my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Vote!</button>
            </form>
        </div>
    )


    return (
        <div className="center">
            <h1 className="text-2xl font-bold text-center mb-4"> Vote Page </h1>
            <p className="text-lg text-center mb-10">{prompt}</p>
            <div className="mx-20 grid grid-cols-2 gap-4 flex">
                {renderItems}
            </div>
        </div>
    );
}

export default Vote;