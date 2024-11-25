import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCatId} from "../slice/dataSlice";

const SmallCatCardComponent=(props)=>{
    const imgRef = useRef();
    const onImageError = () => imgRef.current.src="../../resource/image.png";
    const navigate = useNavigate();
    let dispatch = useDispatch();
    return(
        <div className="favorite_card" onClick={() => {

            dispatch(setCatId(props.id));
            navigate("/cat_card/"+props.id);
        }}>
            <img ref={imgRef}
                 src={"https://cdn2.thecatapi.com/images/"+props.img+".jpg"}
                 width="100" height="100"
                 onError={onImageError}
            />
            <label className="small_text">{props.name}</label>
        </div>
    )
}
export default SmallCatCardComponent