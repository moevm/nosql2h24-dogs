import React, {useEffect, useState} from "react";
import axios from "axios";
import {catOptions} from "../options";
import data from "../profiles.json";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Button, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SearchComponent from "../ui/search.component";
import CatGridComponent from "../ui/catGrid.component";
import FilterComponent from "../ui/filter.component";
import {ArrowBack, PersonOutline} from "@mui/icons-material";
import ImpExpComponent from "./ImpExp.Component";
import {setUserData} from "../slice/userSlice";

export const MainComponent = () => {
    let user_data = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userData"));
    const imp = user.admin ? <ImpExpComponent></ImpExpComponent>:<></>
    useEffect(()=>{
        if(Object.keys(user_data).length === 0)
            navigate("/sign_in")

    },[]);
    return (
        <div className="main_box">
            <div className="main_app_bar">
                <SearchComponent></SearchComponent>
                {imp}
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