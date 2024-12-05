import React, {useRef} from 'react';
import CommentTextField from "./commentTextField.js";
import {useDispatch} from "react-redux";
import {setAuthor} from "../slice/dataSlice";
import {Favorite} from "@mui/icons-material";

const CommentComponent=(props)=>{
    const creation_date =  new Date(props.date);
    let dispatch = useDispatch();
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
                    <Favorite></Favorite>
                    <label>10</label>
                </div>
            </div>


        </div>
    )
}
export default CommentComponent