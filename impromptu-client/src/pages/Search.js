import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import ReactDropdown from 'react-dropdown';

const api_url = "http://localhost:8000";

const Search= () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([{"username": "chimney"}, {"username": "stewie"}, {"username": "abcdefg"}]);
    const [queryType, setQueryType] = useState('prompts');
    const navigate = useNavigate();

    const options = ["Users", "Prompts"];
    const def = options[0];

    useEffect(() => {
        const search = setTimeout(async() => {
            console.log(query);
            const key = queryType=='users' ? 'username' : 'prompt';
            const body = {};
            body[key] = query;
            await axios.post(`${api_url}/search/${queryType}`, body).then((res, err) => {
                console.log(res.data);
                setResults(res.data);
            })
        }, 1000)
    
        return () => clearTimeout(search)
      }, [query])

    return (
        <div className="flex w-full h-full">
            <div className='w-full h-full flex flex-col'> 
                <div className="ml-auto mr-auto w-[40%] flex flex-row">
                    <ReactDropdown className="w-[30%] h-10 p-0" options={options} value={def} onChange={(e)=>setQueryType(e.value.toLowerCase())}/>
                    <input className="w-full h-10 p-3" placeholder='Search' value={query} onChange={(e) => setQuery(e.target.value)}></input>
                </div>
                <div>
                    {results.map((result) => {
                        return <div className='ml-auto mr-auto h-10 bg-white w-[40%] truncate'>{result?.username || result?.text}</div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Search;
