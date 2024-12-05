import React, {useEffect, useRef, useState} from 'react';
import CommentTextField from "./commentTextField.js";
import {useDispatch} from "react-redux";
import {setAuthor} from "../slice/dataSlice";
import {Favorite} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import axios from "axios";
import {BASE_URL} from "../options";
import {setUserData} from "../slice/userSlice";
import {useParams} from "react-router";

const CommentComponent=(props)=>{
    const creation_date =  new Date(props.date);
    let dispatch = useDispatch();
    let { id } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));

    const addFavorite = async () => {

        axios.put(BASE_URL + "/comments/like/"+user.name+"/" + id + "/" + props.id, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log(res.data)
                // dispatch(setUserData(res.data))
                // localStorage.setItem("userData",JSON.stringify(res.data))
                // setUser(res.data)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    const deleteFavorite = async () => {

        axios.put(BASE_URL + "/comments/remove-like/"+user.name+"/" + id + "/" + props.id, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log(res.data)
                // dispatch(setUserData(res.data))
                // localStorage.setItem("userData",JSON.stringify(res.data))
                // setUser(res.data)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }


    return(
        <div className="comment_bubble" onClick={()=>{
            dispatch(setAuthor(props.author))
        }}>
            <div className="comment_bubble_author_text">
                <label className="small_text">{props.author}: </label>
                <label className="small_text">{props.text}</label>
            </div>

            <div className="comment_bubble_column">
                <label>{creation_date.getDate()}.{creation_date.getMonth()+1}.{creation_date.getFullYear()}
                    {creation_date.getHours()}:{creation_date.getMinutes()}</label>
                <div className="comment_bubble_likes">
                    <IconButton onClick={()=>{
                        addFavorite()
                    }}>
                        <Favorite></Favorite>
                    </IconButton>

                    <label>10</label>
                </div>
            </div>


        </div>
    )
}
export default CommentComponent