import React, {useRef} from 'react';
import CommentTextField from "./commentTextField.js";
import {useDispatch} from "react-redux";
import {setAuthor} from "../slice/dataSlice";

const CommentComponent=(props)=>{
    const creation_date =  new Date(props.date);
    let dispatch = useDispatch();
    return(
        <div className="comment_bubble" onClick={()=>{
            dispatch(setAuthor(props.author))
        }}>
            <label>{props.author}</label>
            <label>{creation_date.getDate()}.{creation_date.getMonth()+1}.{creation_date.getFullYear()} {creation_date.getHours()}:{creation_date.getMinutes()}</label>
            <label>{props.text}</label>
        </div>
    )
}
export default CommentComponent