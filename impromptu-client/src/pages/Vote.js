import axios from 'axios'
import { useState, useEffect, useRef } from 'react';

const api_url = "http://localhost:8000"



const Vote = ({user}) => {
    const [feed, setFeed] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [index, setIndex] = useState(0);
    const responded = useRef(false)
    const [displayMessage, setDisplayMessage] = useState(false)
    const [username, setUsername] = useState("Loading user...")
    const [funnyLine, setFunny] = useState("Loading Funny Response")
    const [respID, setRespID] = useState()
    const votes = useRef(0)

    function getResponses() {
        axios.get(`${api_url}/feed`).then((res, err) => {
            //console.log(res)
            setFeed(res.data.responses)
            setIndex(0)
            //console.log(feed)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    function getPrompt(){
        axios.get(`${api_url}/prompt`).then((res, err) => {
            //console.log(res)
            setPrompt(res.data.text)
        }).catch((err) => {
            console.log(err)
        })
    }
    function sendVote(){
        if (!responded.current){
            setDisplayMessage(true)
            return
        }
        responded.current = false
        setDisplayMessage(false)
        setIndex(index + 1)
        //console.log("Here is the requestL ")
        //console.log({response_id: respID, votes: votes.current})
        axios.post(`${api_url}/vote`, {response_id: respID, votes: votes.current}).then((res, err) => {
            //console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    function setup(){
        getPrompt()
        getResponses()
    }

    useEffect(() => {
        if (feed.length > 0 && index < feed.length) {
            setUsername(feed[index].user);
            setFunny(feed[index].response);
            setRespID(feed[index]._id)
        }
    }, [feed, index]);


    useEffect(() => {
        setup();
    }, []);

    const SliderComponent = () => {
        const [value, setValue] = useState(5);
        const handleChange = (event) => {
            if (!responded.current){
                responded.current = true
            }
            setValue(event.target.value);
            votes.current = event.target.value
        };
    
        return (
            <div className="flex flex-grow items-center">
                <label htmlFor="slider" className="text-lg font-medium mr-4">
                    Rate Response: ({value})
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
        return (
            <div className="border rounded border-sky-300 p-4 w-2/3 mx-auto">
            <p className="mx-8 my-2 text-sm font-light">@{username}</p>
            <p className="mx-8 my-2">{funnyLine}</p>
            <div className="flex w-full">
            < SliderComponent/>
            <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {sendVote} type="button">Vote!</button>
            </div>
            {displayMessage && <h3>please adjust rating</h3>}
        </div>
        )
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