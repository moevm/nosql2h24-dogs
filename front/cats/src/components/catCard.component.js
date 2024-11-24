import React from "react";
import {useSelector} from "react-redux";

const CatCardComponent = () => {

    let cat_id = useSelector(state => state.data);

    return (
        <div>
            <h3>CatCard</h3>
            <div>{cat_id.cat_id}</div>
        </div>
    )
}
export default CatCardComponent