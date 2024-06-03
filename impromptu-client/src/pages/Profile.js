import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

const api_url = "http://localhost:8000";

const Profile = ({user}) => {
    const {userID} = useParams();
    const [userData, setUserData] = useState({});
    const [userResponses, setUserResponses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !userID) {
            navigate("/");
        }
        let id = userID || "";
        axios.get(`${api_url}/profile/${id}`, {withCredentials: true}).then((res, err) => {
            setUserData(res.data);
            setUserResponses(res.responses);
            console.log("User data"); 
            console.log(userData);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    /*const renderItems = userResponses.map((content) => 
        <div className="border rounded border-sky-300 first:text-amber-400 place-content-center">
            <p className="mx-8 text-sm font-light">@{content.user}</p>
            <p className="mx-8 text-sm font-bold">{content.votes} Votes</p>
            <p className="mx-8 my-2">{content.response}</p>
        </div>
    );*/

    return (
        <div className="center">
            <div className="place-content-center">
                <h1 className="text-2xl font-bold text-center mb-2">@{userData?.username}'s Profile</h1>
                <h5 className="text-lg text-center mb-4">{userData?.email}</h5>
                <p className="text-lg text-center mb-10">{prompt}</p>
            </div>
            <div className="mx-20 grid grid-cols-1 gap-4 flex">
                Remember to renderItems after we add in backend linking
            </div>
        </div>
    );
}

export default Profile;
