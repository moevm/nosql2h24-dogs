import React, {useRef} from 'react';
import {dark_purple_color} from "../../Themes.js"

const LikeCardComponent = (props) => {
    const text = props.type === "LIKE" ? <label className="small_bold_text">Liked comment (</label> :
        <label className="small_bold_text">Unliked comment (</label>
    return (
        <div className="like_card" onClick={()=>{
            navigate("/cat_card/"+props.breedId);
        }}>

            {text}
            <label className="small_bold_text" style={{
                color: dark_purple_color
            }}>{props.author}</label>
            <label className="small_bold_text">)</label>


        </div>
    )

}
export default LikeCardComponent