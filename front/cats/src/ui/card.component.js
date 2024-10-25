import React from 'react';

const CardComponent = (props) => {
    return (
        <div>
            <div>
                {/*{props.img.toString()}*/}
                <img src={"https://cdn2.thecatapi.com/images/"+props.img+".jpg"} width="200" height="170" alt="lorem"/>
            </div>
            <div>{props.name}</div>
        </div>
    );
};

export default CardComponent;