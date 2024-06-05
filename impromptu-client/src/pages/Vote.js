import axios from 'axios'
import { useState, useEffect, useRef } from 'react';

const api_url = "http://localhost:8000"



const Vote = ({user}) => {
    const [feed, setFeed] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [index, setIndex] = useState(0);
    const [username, setUsername] = useState("Loading user...");
    const [funnyLine, setFunny] = useState("Loading funny response...");
    const [morePosts, setMorePosts] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(true);
    const [respID, setRespID] = useState();
    const votes = useRef(0);

    function getResponses() {
        axios.get(`${api_url}/feed`, {withCredentials: true}).then((res, err) => {
            if ("error" in res.data) {
                setFeed([]);
                if (res.data["error"]=="no more responses") {
                    setMorePosts(false);
                }
                if (res.data["error"]=="submit your response first") {
                    setHasSubmitted(false);
                }
            }
            else setFeed(res.data);
            setIndex(0)
            //console.log(feed)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    function getPrompt(){
        axios.get(`${api_url}/prompt`, {withCredentials: true}).then((res, err) => {
            //console.log(res)
            setPrompt(res.data.text)
        }).catch((err) => {
            console.log(err)
        })
    }
    function sendVote(){

        setIndex(index + 1)
        //console.log("Here is the requestL ")
        console.log({response_id: respID, votes: votes.current})
        axios.post(`${api_url}/vote`, {response_id: respID, votes: votes.current}, {withCredentials: true}).then((res, err) => {
            //console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    function setup(){
        getPrompt();
        getResponses();
        votes.current = 5;
    }

    useEffect(() => {
        if (feed.length > 0 && index < feed.length) {
            // console.log("FEED");
            // console.log(feed);
            setUsername(feed[index].user);
            setFunny(feed[index].response);
            setRespID(feed[index]._id)
            votes.current = 5;
            setMorePosts(true);
        }
        else {
            setMorePosts(false);
        }
    }, [feed, index]);


    useEffect(() => {
        setup();
    }, []);

    const SliderComponent = () => {
        const [value, setValue] = useState(5);
        const handleChange = (event) => {
            setValue(event.target.value);
            votes.current = parseInt(event.target.value);
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
                    min={0}
                    max={10}
                    value={value}
                    onChange={handleChange}
                    className="w-2/3"
                />
            </div>
        );
        
    }

    function DisplayResponse(){
        return (
            <div className="px-4 w-2/3 m-auto my-10 py-5 border border-black align-middle">
            <p className="mx-8 my-2 text-7xl whitespace-pre-wrap">{funnyLine}</p>
            <p className="mx-8 my-2 text-lg font-light">- @{username}</p>
            <div className="flex w-full pb-5">
            < SliderComponent/>
            <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {sendVote} type="button">Vote!</button>
            </div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-6">Vote!</h1>
                <p className="text-2xl text-center mb-5">{prompt}</p>
            {user && morePosts && hasSubmitted && <DisplayResponse content={feed[index]}/>}
            {!user && <div className="flex justify-center items-center mb-3"><div className="w-full max-w-md p-8 rounded-lg shadow-md text-center bg-red-500"><h2 className="text-lg text-center font-bold text-white">Please <a href="/login" className="text-blue-300 underline">sign in</a> to vote for others' responses!</h2></div></div>}
            {!morePosts && <div className="flex justify-center items-center mb-3"><div className="w-full max-w-md p-8 rounded-lg shadow-md text-center bg-red-500"><h2 className="text-lg text-center font-bold text-white">You've voted on all the posts for today! Check again later for more.</h2></div></div>}
            {!hasSubmitted && <div className="flex justify-center items-center mb-3"><div className="w-full max-w-md p-8 rounded-lg shadow-md text-center bg-red-500"><h2 className="text-lg text-center font-bold text-white">Submit your response to the prompt before voting on others'.</h2></div></div>}

        </div>
    );
}



export default Vote;