import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {BASE_URL} from "../options.js";
import {ArrowBack, Equalizer, Face, Settings} from "@mui/icons-material";
import SmallCatCardComponent from "../ui/smallCatCard.component";
import NotificationCardComponent from "../ui/notificationCard.component";

const ProfileComponent = () => {
    let user_data = useSelector(state => state.user);
    const favorites = [
        {name:"1",img:"0XYvRd7oD"},
        {name:"2",img:"ozEvzdVM"},
        {name:"1",img:"0XYvRd7oD"},
        {name:"2",img:"ozEvzdVM-"},
        {name:"1",img:"0XYvRd7oD"},
        {name:"2",img:"ozEvzdVM-"},
        {name:"1",img:"0XYvRd7oD"},
        {name:"2",img:"ozEvzdVM-"},
    ]
    const notifications = [
        {name:"1",comment:"0XYvRd7oD"},
        {name:"2",comment:"ozEvzdVM"},
        {name:"3",comment:"0XYvRd7oD"},
        {name:"4",comment:"ozEvzdVM-"},
        {name:"1",comment:"0XYvRd7oD"},
        {name:"2",comment:"ozEvzdVM-"},
        {name:"1",comment:"0XYvRd7oD"},
        {name:"2",comment:"ozEvzdVM-"},
    ]
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const fetchData = async () => {
        axios.get(BASE_URL+"/users", {
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

    const favorite_data = favorites?.map(cat =>
        <div>
            <SmallCatCardComponent name={cat.name} img={cat.img}
            ></SmallCatCardComponent>
        </div>
    )

    const notifications_data = notifications?.map(cat =>
        <div>
            <NotificationCardComponent name={cat.name} comment={cat.comment}
            ></NotificationCardComponent>
        </div>
    )

    return (
        <div className="profile_box">
            <div className="profile_app_bar">
                <IconButton onClick={()=>{
                    alert("back")
                    }
                }>
                    <ArrowBack/>
                </IconButton>
                <IconButton className = "profile_app_bar_icon_right">
                    <Equalizer />
                </IconButton>
                <IconButton className = "profile_app_bar_icon_right">
                    <Settings />
                </IconButton>

                <label className = "profile_app_bar_icon_right" > Log out</label>
            </div>
            <div className="profile_data_row">
                <img src={"../cats/resource/profile.png"} width="300" height="300" alt={
                    <Face/>
                }/>
                <div className="profile_data_column">
                    <div className="big_text">Name</div>
                    <div className="small_text">Age:</div>
                    <div className="small_text">Creation date:</div>
                    <div className="small_text">Last edit date:</div>
                </div>
            </div>
            {JSON.stringify(user_data)}
            <Button onClick={()=>{
                navigate("/statistic")
            }}>
                Statistics
            </Button>

            <label className="medium_text">Favorites</label>
            <div className="card_row">
                {favorite_data}
            </div>

            <label className="medium_text">Notifications</label>
            <div className="card_row">
                {notifications_data}
            </div>
            <label className="medium_text">Comments</label>
            <label className="medium_text">Likes</label>
        </div>
    )
}
export default ProfileComponent