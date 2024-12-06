import React, {useRef} from 'react';
import {dark_purple_color} from "../../Themes.js"
import {useNavigate} from "react-router-dom";
const CommentNotificationCardComponent=(props)=> {
    const navigate = useNavigate();
    const label = props.type === "REPLY" ? <div>
        <label className="small_bold_text">Replied to a comment (</label>
        <label className="small_bold_text" style={{
            color: dark_purple_color
        }}>{props.author}</label>
        <label className="small_bold_text">)</label>
    </div> : <div>
        <label className="small_bold_text">Commented breed</label>
    </div>
    return (
        <div className="comment_card" onClick={() => {
            navigate("/cat_card/" + props.breedId);
        }}>
            {label}

            <label className="small_text">{props.comment}</label>
        </div>
    )
}
export default CommentNotificationCardComponent