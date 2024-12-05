import React, {useEffect, useRef, useState} from 'react';
import CommentTextField from "./commentTextField.js";
import CommentBubbleComponent from "./commentBubble.component";
import axios from "axios";
import {BASE_URL} from "../options";
import {setUserData} from "../slice/userSlice";
import {useParams} from "react-router";
import {useSelector} from "react-redux";

const CommentComponent=(props)=>{
    //const comments = props.comment
    const [comments, setComments] = useState([]);
    let { id } = useParams();
    let data = useSelector(state => state.data);
    const getComments = async () => {

        axios.get(BASE_URL + "/comments/byBreed/" + id, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                setComments(res.data);
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    useEffect(()=>{
        getComments()
    },[data.sendComment])
    return(
        <div className="comment_box">
            <div className = "comment_bubble_list">
                {comments?.map(comment=>
                    <CommentBubbleComponent text ={comment.text} author = {comment.author} date = {comment.date}>
                    </CommentBubbleComponent>
                )}
            </div>

            <CommentTextField></CommentTextField>
        </div>
    )
}
export default CommentComponent