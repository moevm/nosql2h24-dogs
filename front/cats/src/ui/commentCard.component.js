import React, {useRef} from 'react';
import {dark_purple_color} from "../Themes.js"
const CommentCardComponent=(props)=>{

    return(
        <div className="comment_card">
            <div>
                <label className="small_bold_text">{props.type} (</label>
                <label className="small_bold_text" style={{
                    color:dark_purple_color
                }} >{props.author}</label>
                <label className="small_bold_text">)</label>
            </div>

            <label className="small_text">{props.comment}</label>
        </div>
    )
}
export default CommentCardComponent