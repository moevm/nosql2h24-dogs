import React, {useEffect, useRef, useState} from 'react';
import CommentTextField from "./commentTextField.js";
import {useDispatch} from "react-redux";
import {setAuthor} from "../slice/dataSlice";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
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
    const [likes,setLikes] = useState(props.likes?props.likes:[]);

    const addFavorite = async () => {

        axios.put(BASE_URL + "/comments/like/"+user.name+"/" + id + "/" + props.commentId, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {


                if(likes?.length){
                    setLikes([...likes,user.name])
                }
                else{
                    setLikes([user.name])
                }


            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    const deleteFavorite = async () => {

        axios.put(BASE_URL + "/comments/remove-like/"+user.name+"/" + id + "/" + props.commentId, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {

                const newList = likes.filter((item) => item !== user.name);

                setLikes(newList);
                //alert("delete")
                // const index = test.indexOf(user.name);
                // console.log(index)
                // if (index > -1) {
                //     test = test.splice(index, 1);
                // }
                //console.log(likes)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    const FavoriteIcon =  likes?.includes(user.name) ? <Favorite/>:<FavoriteBorder/>;

    return(
        <div className="comment_bubble" >
            <div className="comment_bubble_author_text">
                <label className="small_text"
                       onClick={()=>{
                    console.log(props.commentId);
                    dispatch(setAuthor(
                        {
                            author: props.author,
                            commentId: props.commentId,
                        }

                    ))
                }}>{props.author}: </label>
                <div className="text_overflow">{props.text}</div>
            </div>

            <div className="comment_bubble_column">
                <div>{creation_date.getDate()}.{creation_date.getMonth()+1}.{creation_date.getFullYear()} {creation_date.getHours()}:{creation_date.getMinutes()}</div>
                <div className="comment_bubble_likes">
                    <IconButton onClick={()=>{

                        if(likes?.includes(user.name)){
                            deleteFavorite().then()
                        }else {
                            addFavorite().then()
                        }



                    }}>
                        {FavoriteIcon}
                    </IconButton>

                    <label>{likes?.length}</label>
                </div>
            </div>


        </div>
    )
}
export default CommentComponent