import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


const CommentCardComponent=(props)=>{


    const imgRef = useRef();
    const navigate = useNavigate();
    let dispatch = useDispatch();
    return(
        <div className="favorite_card" onClick={() => {


            navigate("/cat_card");
        }}>
            <img ref={imgRef}
                 src={"https://cdn2.thecatapi.com/images/"+props.img+".jpg"}
                 width="100" height="100"
                 //onError={onImageError}
            />
            <label className="small_text">{props.name}</label>
        </div>
    )
}
export default CommentCardComponent