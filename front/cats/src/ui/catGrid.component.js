import React, {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, catOptions} from "../options";
import SearchComponent from "./search.component";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import {useSelector} from "react-redux";
import SmallCatCardComponent from "./small_cards/smallCatCard.component";

const CatGridComponent = () => {
    let filter_data = useSelector(state => state.filter);

    const [catData, setCatData] = useState(null);
    const [usersData, setUsersData] = useState(null);
    const [eventsData, setEventsData] = useState(null);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const amountOfCatsOnPage = 16;
    let page = 1;
    const fetchData = async () => {

        axios.post(BASE_URL+"/breeds/bodySearch"/*"+amountOfCatsOnPage+"/"+page*/, {
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
            <SmallCatCardComponent  id={cat.id}
            ></SmallCatCardComponent>

    )
    if (isDataLoading) {
        return (
            <div>
                <div className="big_text">Amount of cats: {catData.length}</div>
                <div className="cat_grid">
                    {/*{JSON.stringify(filter_data)}*/}
                    {data}
                </div>
            </div>

        )
    } else {
        return (
            <Box className="cat_grid_progress_bar">
            <CircularProgress/>
            </Box>
        )
    }
}
export default CatGridComponent