import React, {useEffect, useState} from "react";
import axios from "axios";
import {catOptions} from "../options";

export const MainComponent = () => {


    const [catData, setCatData] = useState(null);
    const fetchData = async () => {
        axios.get("https://api.thecatapi.com/v1/breeds?limit=10&page=0",
            catOptions)
            .then(res => {
                console.log(res);
                setCatData(res.data)
            })

            .catch(err => {console.error("error fetching data", err)});
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <h3>Main</h3>
            {catData?.toString()}
        </div>
    )

}

export default MainComponent