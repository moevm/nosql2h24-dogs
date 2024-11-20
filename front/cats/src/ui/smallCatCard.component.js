import React, {useRef} from 'react';

const SmallCatCardComponent=(props)=>{
    const imgRef = useRef();
    const onImageError = () => imgRef.current.src="../../resource/image.png";

    return(
        <div className="favorite_card">
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