import axios from 'axios'
import { useState, useEffect } from 'react';

const api_url = "http://localhost:8000"



const Vote = ({user}) => {
    const [feed, setFeed] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [index, setIndex] = useState(0);

    function getResponses() {
        axios.get(`${api_url}/feed`).then((res, err) => {
            console.log(res)
            setFeed(res.data.responses)
            console.log(feed)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    function getPrompt(){
        axios.get(`${api_url}/prompt`).then((res, err) => {
            console.log(res)
            setPrompt(res.data.text)
        }).catch((err) => {
            console.log(err)
        })
    }

    function setup(){
        getPrompt()
        getResponses()
    }

    useEffect(() => {
        setup();
    }, []);

    const SliderComponent = () => {
        const [value, setValue] = useState(5);
    
        const handleChange = (event) => {
            setValue(event.target.value);
        };
    
        return (
            <div className="flex-grow">
                <label htmlFor="slider" className="text-lg font-medium mr-10">
                Rate Response:
                </label>
                <input
                    type="range"
                    id="slider"
                    name="slider"
                    min="0"
                    max="10"
                    value={value}
                    onChange={handleChange}
                    className="w-2/3"
                />
            </div>
        );
    }

    function DisplayResponse(){
        if (feed.length != 0){
        return (
            <div className="border rounded border-sky-300 p-4 w-2/3 mx-auto">
            <p className="mx-8 my-2 text-sm font-light">@{feed[index].user}</p>
            <p className="mx-8 my-2">{feed[index].response}</p>
            <div className="flex w-full">
            < SliderComponent/>
            <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Vote!</button>
            </div>
        </div>
        )
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-4"> Vote! </h1>
            <p className="text-lg text-center mb-10">{prompt}</p>
            <DisplayResponse content={feed[index]}/>
        </div>
    );
}



export default Vote;