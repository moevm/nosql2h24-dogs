import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const ProfileComponent = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const fetchData = async () => {
        axios.get("http://backend:1240/api/users", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log(res.data);
                setUserData(res.data)

            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    useEffect(() => {

        fetchData();
    }, []);

    return (
        <div>
            <h3>Profile</h3>
            {JSON.stringify(userData)}
            <Button onClick={()=>{
                navigate("/statistic")
            }}>
                Statistics
            </Button>
            <div>
                <img src={"../cats/resource/profile.png"} width="300" height="300" alt="profile"/>
                <div>
                    <div>Name</div>
                    <div>Age:</div>
                    <div>Creation date:</div>
                    <div>Last edit date:</div>
                </div>
            </div>
            <h4>Favorites</h4>
            <h4>Notifications</h4>
            <h4>Comments</h4>
            <h4>Likes</h4>
        </div>
    )
}
export default ProfileComponent