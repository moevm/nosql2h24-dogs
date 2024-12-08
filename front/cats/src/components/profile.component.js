import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {BASE_URL} from "../options.js";
import {useDispatch} from "react-redux";
import {ArrowBack, Equalizer, Face, Settings, StarBorder} from "@mui/icons-material";
import SmallCatCardComponent from "../ui/small_cards/smallCatCard.component";
import NotificationCardComponent from "../ui/small_cards/notificationCard.component";
import CommentNotificationCardComponent from "../ui/small_cards/commentNotificationCard.component";
import LikeCardComponent from "../ui/small_cards/likeCard.component";
import {clearUserData, setUserData} from "../slice/userSlice.js";
import "../style/profile.css"
import "../style/small_cards.css"

import LoadingBar from "react-top-loading-bar";
import CircularProgress from "@mui/material/CircularProgress";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
const ProfileComponent = () => {
    let dispatch = useDispatch();
    //let user_data = useSelector(state => state.user);
    let user_data = JSON.parse(localStorage.getItem("userData"));
    let user = useSelector(state => state.user);
    //alert(JSON.stringify(user_data))

    const favorites = user_data.favorites;
    const [favoritesData, setFavoritesData] = useState([]);
    const [liked, setLiked] = useState(null);
    const [comments, setComments] = useState(null);
    const [notification, setNotification] = useState(null);
    const admin = user_data.admin?<StarBorder/>:<></>;
    // const notifications = [
    //     {name: "1", comment: "0XYvRd7oD"},
    //     {name: "2", comment: "ozEvzdVM"},
    //     {name: "3", comment: "0XYvRd7oD"},
    //     {name: "4", comment: "ozEvzdVM-"},
    //     {name: "1", comment: "0XYvRd7oD"},
    //     {name: "2", comment: "ozEvzdVM-"},
    //     {name: "1", comment: "0XYvRd7oD"},
    //     {name: "2", comment: "ozEvzdVM-"},
    // ]
    // const comments = [
    //     {name: "1", comment: "0XYvRd7oD", author: "me"},
    //     {name: "2", comment: "ozEvzdVM", author: "me"},
    //     {name: "3", comment: "0XYvRd7oD", author: "me"},
    //     {name: "4", comment: "ozEvzdVM-", author: "me"},
    //     {name: "1", comment: "0XYvRd7oD", author: "me"},
    //     {name: "2", comment: "ozEvzdVM-", author: "me"},
    //     {name: "1", comment: "0XYvRd7oD", author: "me"},
    //     {name: "2", comment: "ozEvzdVM-", author: "me"},
    // ]
    // const liked = [
    //     {name: "1", comment: "0XYvRd7oD", author: "not me"},
    //     {name: "2", comment: "ozEvzdVM", author: "me"},
    //     {name: "3", comment: "0XYvRd7oD", author: "me"},
    //     {name: "4", comment: "ozEvzdVM-", author: "me"},
    //     {name: "1", comment: "0XYvRd7oD", author: "me"},
    //     {name: "2", comment: "ozEvzdVM-", author: "me"},
    //     {name: "1", comment: "0XYvRd7oD", author: "me"},
    //     {name: "2", comment: "ozEvzdVM-", author: "me"},
    // ]
    const navigate = useNavigate();
    //const [catData, setCatData] = useState(null);

    const getNotifications = async () => {

        axios.get(BASE_URL + "/events/breed_comments/"+user_data?.name, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log("notofications:")
                console.log(res.data);
                setNotification(res.data)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    const getLikes = async () => {

        axios.get(BASE_URL + "/events/likes/"+user_data?.name, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log("likes:")
                console.log(res.data);
                setLiked(res.data);
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    const getComments = async () => {

        axios.get(BASE_URL + "/events/reply/"+user_data?.name, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log("comments:")
                console.log(res.data);
                setComments(res.data);
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }

    useEffect(()=>{
        if(Object.keys(user_data).length === 0)
            navigate("/sign_in")
        dispatch(setUserData(user_data));
        getNotifications()
        getComments()
        getLikes()

    },[]);


    const creation_date =  new Date(user.creationDate);
    const last_date =  new Date(user.lastDate);

    const favorite_data =
        favorites?.map(fav =>
            <div>
                <SmallCatCardComponent id={fav}
                ></SmallCatCardComponent>
            </div>
        )

    const notifications_data = notification?.map(comment =>
        <div>
            <CommentNotificationCardComponent type="COMMENT" author={comment.commentingUserId} breedId = {comment.breedId}
                                       commentId={comment.commentId} comment = {comment.text}
            ></CommentNotificationCardComponent>
        </div>
    )
    const comments_data = comments?.map(comment =>
        <div>
            <CommentNotificationCardComponent type="REPLY" author={comment.replyingUserId} breedId = {comment.breedId}
                                               commentId={comment.commentId} comment = {comment.text}
            ></CommentNotificationCardComponent>
        </div>
    )
    const liked_data = liked?.map(like =>
        <div>
            <LikeCardComponent author={like.likingUserId} type={like.type} breedId = {like.breedId} comment = {like.commentId}
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
                        <Settings className="profile_app_bar_icon" onClick={()=>{
                            navigate("/edit_profile")
                        }}/>
                    </IconButton>

                    <label className="medium_text" onClick={()=>{
                        dispatch(clearUserData())
                        localStorage.setItem("userData","{}")
                        navigate("/sign_in")
                    }}> Log out</label>
                </div>
            </div>

            <div className="profile_data_row">
                <div className="profile_img">
                    {admin}
                    <img src={"../cats/resource/profile.png"} width="300" height="300" alt={
                        <Face/>
                    }/>
                </div>

                <div className="profile_data_column">
                    <div className="big_text">{user.name}</div>
                    <div className="small_text">Age: {user.age}</div>
                    <div className="small_text">Creation date: {creation_date.getDate()}.{creation_date.getMonth()+1}.{creation_date.getFullYear()} {creation_date.getHours()}:{creation_date.getMinutes()}</div>
                    <div className="small_text">Last edit date: {last_date.getDate()}.{last_date.getMonth()+1}.{last_date.getFullYear()} {last_date.getHours()}:{last_date.getMinutes()}</div>
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