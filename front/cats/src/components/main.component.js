import React, {useEffect, useState} from "react";
import axios from "axios";
import {catOptions} from "../options";
import CardComponent from "../ui/card.component";
import data from "../profiles.json";


export const MainComponent = () => {


    const [catData, setCatData] = useState(null);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const fetchData = async () => {
        axios.get("https://api.thecatapi.com/v1/breeds?limit=100",
            catOptions)
            .then(res => {
                console.log(res);
                setCatData(res.data)
                setIsDataLoading(true)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    useEffect(() => {
        fetchData();
    }, []);
    // catData?.forEach((item) => {
    //     alert(item.image)
    // })
    const data = catData?.map(cat =>
        <div>
            <CardComponent name={cat.name} img={cat.reference_image_id}
                          ></CardComponent>
        </div>
    )
    if (isDataLoading) {
        return (
            <div>
                <h3>Main</h3>
                {data}


            </div>
        )
    } else {
        return (
            <></>
        )
    }


}

export default MainComponent