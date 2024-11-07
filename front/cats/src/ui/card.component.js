import React from 'react';

import { useNavigate} from "react-router-dom";
const CardComponent = (props) => {
    const navigate = useNavigate();
    return (
        <div  onClick={() => {
            // Todo
            // create request
            localStorage.setItem("catId",props.name)
            navigate("/cat_card");

        }}>
            <div>
                {/*{props.img.toString()}*/}
                <img src={"https://cdn2.thecatapi.com/images/"+props.img+".jpg"} width="200" height="170" alt="lorem"/>
            </div>
            <div>{props.name}</div>
        </div>
    );
};

export default CardComponent;