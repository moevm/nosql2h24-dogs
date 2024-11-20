import React, {useRef} from 'react';
import {dark_purple_color} from "../Themes.js"
const LikeCardComponent=(props)=>{

    return(
        <div className="like_card">

                <label className="small_bold_text">Liked comment (</label>
                <label className="small_bold_text" style={{
                    color:dark_purple_color
                }} >{props.author}</label>
                <label className="small_bold_text">)</label>


        </div>
    )
}
export default LikeCardComponent