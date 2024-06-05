import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import ReactDropdown from 'react-dropdown';

const api_url = "http://localhost:8000";

const Search= () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([{"username": "chimney"}, {"username": "stewie"}, {"username": "abcdefg"}]);
    const [queryType, setQueryType] = useState('users');
    const navigate = useNavigate();

    const options = ["Users", "Prompts"];
    const def = options[0];

    useEffect(() => {
        const search = setTimeout(async() => {
            const key = queryType=='users' ? 'username' : 'prompt';
            const body = {};
            body[key] = query;
            await axios.post(`${api_url}/search/${queryType}`, body).then((res, err) => {
                console.log(res.data);
                setResults(res.data);
            })
        }, 200)
    
        return () => clearTimeout(search)
      }, [query, queryType])

    return (
        <div className="flex w-full h-full">
            <div className='w-full h-full flex flex-col'> 
                <div className="ml-auto mr-auto w-[40%] flex flex-row">
                    <ReactDropdown className="w-[30%] h-10 p-0" options={options} value={def} onChange={(e)=>setQueryType(e.value.toLowerCase())}/>
                    <input className="w-full h-10 p-3" placeholder='Search' value={query} onChange={(e) => setQuery(e.target.value)}></input>
                </div>
                <div className='ml-auto mr-auto w-[40%]'>
                    {results.map((result, key) => {
                        if (key<10) 
                            return <button 
                                className='h-10 bg-white w-full truncate pt-1 pl-4 pr-4 hover:bg-gray-200 cursor-pointer text-left'
                                onClick={()=>{result?.username ? navigate(`/profile/${result._id}`): navigate(`/scoreboard/${result.createdAt.split("T")[0]}`)}}>
                                {result?.username || result?.text}
                            </button>
                    })}
                    {results.length==0 ? <div className='h-10 bg-white w-full truncate pt-2 pl-4 pr-4 hover:bg-gray-200 cursor-pointer text-left'>
                        No results found...
                    </div>: <></>}
                </div>
            </div>
        </div>
    );
}

export default Search;
