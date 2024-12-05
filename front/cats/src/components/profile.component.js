import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {BASE_URL} from "../options.js";
import {useDispatch} from "react-redux";
import {ArrowBack, Equalizer, Face, Settings} from "@mui/icons-material";
import SmallCatCardComponent from "../ui/small_cards/smallCatCard.component";
import NotificationCardComponent from "../ui/small_cards/notificationCard.component";
import CommentNotificationCardComponent from "../ui/small_cards/commentNotificationCard.component";
import LikeCardComponent from "../ui/small_cards/likeCard.component";
import {clearUserData, setUserData} from "../slice/userSlice.js";
import "../style/profile.css"
import "../style/small_cards.css"
import LoadingBar from "react-top-loading-bar";
import CircularProgress from "@mui/material/CircularProgress";
const ProfileComponent = () => {
    let dispatch = useDispatch();
    //let user_data = useSelector(state => state.user);
    let user_data = JSON.parse(localStorage.getItem("userData"));

    //alert(JSON.stringify(user_data))
    const favorites = user_data.favorites;
    const [favoritesData, setFavoritesData] = useState([]);

    const notifications = [
        {name: "1", comment: "0XYvRd7oD"},
        {name: "2", comment: "ozEvzdVM"},
        {name: "3", comment: "0XYvRd7oD"},
        {name: "4", comment: "ozEvzdVM-"},
        {name: "1", comment: "0XYvRd7oD"},
        {name: "2", comment: "ozEvzdVM-"},
        {name: "1", comment: "0XYvRd7oD"},
        {name: "2", comment: "ozEvzdVM-"},
    ]
    const comments = [
        {name: "1", comment: "0XYvRd7oD", author: "me"},
        {name: "2", comment: "ozEvzdVM", author: "me"},
        {name: "3", comment: "0XYvRd7oD", author: "me"},
        {name: "4", comment: "ozEvzdVM-", author: "me"},
        {name: "1", comment: "0XYvRd7oD", author: "me"},
        {name: "2", comment: "ozEvzdVM-", author: "me"},
        {name: "1", comment: "0XYvRd7oD", author: "me"},
        {name: "2", comment: "ozEvzdVM-", author: "me"},
    ]
    const liked = [
        {name: "1", comment: "0XYvRd7oD", author: "not me"},
        {name: "2", comment: "ozEvzdVM", author: "me"},
        {name: "3", comment: "0XYvRd7oD", author: "me"},
        {name: "4", comment: "ozEvzdVM-", author: "me"},
        {name: "1", comment: "0XYvRd7oD", author: "me"},
        {name: "2", comment: "ozEvzdVM-", author: "me"},
        {name: "1", comment: "0XYvRd7oD", author: "me"},
        {name: "2", comment: "ozEvzdVM-", author: "me"},
    ]
    const navigate = useNavigate();
    //const [catData, setCatData] = useState(null);


    useEffect(()=>{
        if(Object.keys(user_data).length === 0)
            navigate("/sign_in")
    });


    const creation_date =  new Date(user_data.creationDate);


    const favorite_data =
        favorites?.map(fav =>
            <div>
                <SmallCatCardComponent id={fav}
                ></SmallCatCardComponent>
            </div>
        )

    const notifications_data = notifications?.map(cat =>
        <div>
            <NotificationCardComponent name={cat.name} comment={cat.comment}
            ></NotificationCardComponent>
        </div>
    )
    const comments_data = comments?.map(cat =>
        <div>
            <CommentNotificationCardComponent type={cat.name} comment={cat.comment} author={cat.author}
            ></CommentNotificationCardComponent>
        </div>
    )
    const liked_data = liked?.map(cat =>
        <div>
            <LikeCardComponent author={cat.author}
            ></LikeCardComponent>
        </div>
    )

    return (
        <div className="profile_box">
            <div className="profile_app_bar">
                <div>
                    <IconButton onClick={() => {
                        navigate("/main")
                    }
                    }

                    >
                        <ArrowBack className="profile_app_bar_icon"/>
                    </IconButton>
                </div>
                <div>

                    <IconButton>
                        <Equalizer className="profile_app_bar_icon" onClick={() => {
                            navigate("/statistic")
                        }}/>
                    </IconButton>
                    <IconButton>
                        <Settings className="profile_app_bar_icon"/>
                    </IconButton>

                    <label className="medium_text" onClick={()=>{
                        dispatch(clearUserData())
                        localStorage.setItem("userData","{}")
                        navigate("/sign_in")
                    }}> Log out</label>
                </div>
            </div>

            <div className="profile_data_row">
                <img src={"../cats/resource/profile.png"} width="300" height="300" alt={
                    <Face/>
                }/>
                <div className="profile_data_column">
                    <div className="big_text">{user_data.name}</div>
                    <div className="small_text">Age: {user_data.age}</div>
                    <div className="small_text">Creation date: {creation_date.getMonth()}</div>
                    <div className="small_text">Last edit date: {user_data.lastDate}</div>
                </div>
            </div>

            <label className="medium_text">Favorites</label>
            <div className="card_row">
                {favorite_data}
            </div>

            <label className="medium_text">Notifications</label>
            <div className="card_row">
                {notifications_data}
            </div>
            <label className="medium_text">Comments</label>
            <div className="card_row">
                {comments_data}
            </div>
            <label className="medium_text">Likes</label>
            <div className="card_row">
                {liked_data}
            </div>
        </div>
    )
}
export default ProfileComponent