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
        let id = userID || "";
        axios.get(`${api_url}/profile/${id}`, {withCredentials: true}).then((res, err) => {
            // console.log(res.data);
            if ("error" in res.data) navigate("/login");
            setUserData(res.data);
            setUserResponses(res.data.responses);
        }).catch((err) => {
            console.log(err);
        })
    }, [user]);

    const renderItems = userResponses.map((content, key) => 
        <div className="border rounded border-sky-300 place-content-center">
            <p className="mt-5 mx-8 text-sm">Prompt: {content.promptText}</p>
            <p className="mx-8 my-2 font-bold">@{userData?.username}'s response: {content.response}</p>
            <p className="mb-5 mx-8 text-sm">{content.votes} Votes</p>
        </div>
    );

    return (
        <div className="center">
            <div className="place-content-center">
                <h1 className="text-2xl font-bold text-center mb-2">@{userData?.username}'s Profile</h1>
                <h5 className="text-lg text-center mb-4">{userData?.email}</h5>
                <p className="text-lg text-center mb-10">{prompt}</p>
            </div>
            <div className="mx-20 grid grid-cols-1 gap-4 flex">
                {renderItems}
            </div>
        </div>
    );
}

export default Profile;
