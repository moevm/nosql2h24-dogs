import React, {useEffect, useState} from "react";
import axios from "axios";
import {catOptions} from "../options";
import SearchComponent from "../ui/search.component";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CardComponent from "../ui/card.component";

const CatGridComponent = () => {
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
    const data = catData?.map(cat =>
        <div>
            <CardComponent name={cat.name} img={cat.reference_image_id}
            ></CardComponent>
        </div>
    )
    if (isDataLoading) {
        return (
            <div>
                {data}
            </div>
        )
    } else {
        return (
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
        )
    }
}
export default CatGridComponent