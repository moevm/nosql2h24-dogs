import React, {useEffect, useState} from "react";
import axios from "axios";
import {catOptions} from "../options";
import CardComponent from "../ui/card.component";
import data from "../profiles.json";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Button, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SearchComponent from "../ui/search.component";
import CatGridComponent from "./catGrid.component";
import FilterComponent from "../ui/filter.component";
import {ArrowBack, PersonOutline} from "@mui/icons-material";

export const MainComponent = () => {

    const navigate = useNavigate();
    return (
        <div className="main_box">
            <div className="main_app_bar">
                <SearchComponent></SearchComponent>
                <IconButton onClick={() => {
                    navigate("/profile")
                    }}>
                    <PersonOutline className="profile_app_bar_icon"/>
                </IconButton>
            </div>

            <div className="main_main_box">
                <CatGridComponent></CatGridComponent>
                <FilterComponent></FilterComponent>
            </div>

        </div>
    )


}

export default MainComponent