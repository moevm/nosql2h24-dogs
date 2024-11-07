import React, {useEffect, useState} from "react";
import axios from "axios";
import {catOptions} from "../options";
import CardComponent from "../ui/card.component";
import data from "../profiles.json";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SearchComponent from "../ui/search.component";
import CatGridComponent from "./catGrid.component";
import FilterComponent from "../ui/filter.component";

export const MainComponent = () => {

    const navigate = useNavigate();
    return (
        <div>
            <div>Main
                <Button onClick={() => {
                    navigate("/profile")
                }}> Profile</Button></div>

            <SearchComponent></SearchComponent>
            <FilterComponent></FilterComponent>
            <CatGridComponent></CatGridComponent>
        </div>
    )


}

export default MainComponent