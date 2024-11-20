import React from 'react';

const FavoriteCardComponent=(props)=>{
    return(
        <div className="favorite_card">
            <img src={"https://cdn2.thecatapi.com/images/"+props.img+".jpg"} width="100" height="100" alt={props.img}/>
            <label className="small_text">{props.name}</label>
        </div>
    )
}
export default FavoriteCardComponent