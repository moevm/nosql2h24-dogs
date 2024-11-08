import React, {useEffect, useState} from "react";
import axios from "axios";
import {catOptions} from "../options";
import SearchComponent from "../ui/search.component";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CardComponent from "../ui/card.component";

import {useSelector} from "react-redux";

const CatGridComponent = () => {
    let filter_data = useSelector(state => state.filter);

    const [catData, setCatData] = useState(null);
    const [usersData, setUsersData] = useState(null);
    const [eventsData, setEventsData] = useState(null);
    const [isDataLoading, setIsDataLoading] = useState(true);

    const fetchData = async () => {
        axios.get("http://localhost:1240/api/breeds", {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
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
                {JSON.stringify(filter_data)}
                {/*{data}*/}
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