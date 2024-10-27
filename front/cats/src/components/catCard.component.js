import React from "react";

const CatCardComponent = () => {
    return (
        <div>
            <h3>CatCard</h3>
            <div>{localStorage.getItem("catId")}</div>
        </div>
    )
}
export default CatCardComponent