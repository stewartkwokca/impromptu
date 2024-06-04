import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

const api_url = "http://localhost:8000";

const History = ({user}) => {
    const [query, setQuery] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    return (
        <div className="center">
            
        </div>
    );
}

export default History;
