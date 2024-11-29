import React, {useRef} from 'react';
import CommentTextField from "./commentTextField.js";
import CommentBubbleComponent from "./commentBubble.component";

const CommentComponent=(props)=>{
    const comments = props.comment
    return(
        <div className="comment_box">
            {comments?.map(comment=>
            <CommentBubbleComponent text ={comment.text} author = {comment.author} date = {comment.date}>
            </CommentBubbleComponent>
            )}
            <CommentTextField></CommentTextField>
        </div>
    )
}
export default CommentComponent