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
    const [isDataLoading, setIsDataLoading] = useState(false);

    const fetchData = async () => {

        axios.post("http://localhost:1240/api/breeds/bodySearch", {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
            part_name: filter_data.part_name,
            filter_number: filter_data.filter_number,
            filter_bigger_number:filter_data.filter_bigger_number,
            filter_temperament:filter_data.filter_temperament,
            filter_country: filter_data.filter_country,
            filter_country_codes:filter_data.filter_country_codes,
            data: filter_data
        })
            .then(res => {
                console.log(res.data);
                setCatData(res.data)
                setIsDataLoading(true)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    useEffect(() => {

        setIsDataLoading(false)
        //alert(JSON.stringify(filter_data));
        fetchData();
    }, [filter_data]);
    const data = catData?.map(cat =>
        <div>
            <CardComponent name={cat.name} img={cat.referenceImageId}
            ></CardComponent>
        </div>
    )
    if (isDataLoading) {
        return (
            <div>
                {/*{JSON.stringify(filter_data)}*/}
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