import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    catOptions,
    FILTER_DATA_COUNTRY,
    FILTER_DATA_COUNTRY_CODES,
    FILTER_DATA_NUMBERS, FILTER_DATA_STRING_NUMBERS,
    FILTER_DATA_TEMPERAMENT
} from "../options";
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
import {useDispatch} from "react-redux";
import {updateFilter} from "../slice/filterSlice";
import {setPage} from "../slice/dataSlice";

export const MainComponent = () => {
    let user_data = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userData"));
    const imp = user.admin ? <ImpExpComponent></ImpExpComponent>:<></>
    useEffect(()=>{
        if(Object.keys(user_data).length === 0)
            navigate("/sign_in")

    },[]);
    let dispatch = useDispatch();
    const [checkedTemperament, setCheckedTemperament] = useState([])
    const [checkedCountry, setCheckedCountry] = useState([])
    const [checkedCountryCodes, setCheckedCountryCodes] = useState([])
    const [checkedNumbers, setCheckedNumbers] = useState([])
    const [checkedStringNumbers, setCheckedStringNumbers] = useState([])
    const autocomplete = [
        {
            options:FILTER_DATA_COUNTRY_CODES,
            onChange(event, newValue){
                setCheckedCountryCodes(newValue);
            },
            label:"Country Codes"
        },
        {
            options:FILTER_DATA_COUNTRY,
            onChange(event, newValue){
                setCheckedCountry(newValue);
            },
            label:"Country"
        },
        {
            options:FILTER_DATA_TEMPERAMENT,
            onChange(event, newValue){
                setCheckedTemperament(newValue);
            },
            label:"Temperament"
        },
    ]
    const min_max_filter = [
        {
            min:1,
            max:5,
            data: FILTER_DATA_NUMBERS,
            onChangeCheck(e){
                const isChecked = e.target.checked
                //filter_data_numbers[Number(e.target.value) - 1].isChecked = isChecked;
                const value = FILTER_DATA_NUMBERS[Number(e.target.value) - 1]
                if (isChecked) {
                    setCheckedNumbers([...checkedNumbers, value])

                } else {
                    const filtered = checkedNumbers.filter(item => item.id !== value.id);
                    setCheckedNumbers(filtered)
                }
            },
            onChangeFrom(e,item){
                if (Number(e.target.value) > 5 || Number(e.target.value) < 1) {
                    e.target.value = "1"
                } else {
                    const index = checkedNumbers.findIndex(itemm => itemm.id === item.id);
                    if (index !== -1) {
                        //alert(JSON.stringify(checkedNumbers[index]))
                        checkedNumbers[index].from = Number(e.target.value);
                    }
                    //filter_data_numbers[Number(item.id) - 1].from = Number(e.target.value);
                }
            },
            onChangeTo(e,item){
                if (Number(e.target.value) > 5 || Number(e.target.value) < 1) {
                    e.target.value = "1"
                } else {
                    const index = checkedNumbers.findIndex(itemm => itemm.id === item.id);
                    if (index !== -1) {
                        checkedNumbers[index].to = Number(e.target.value);
                    }
                    //filter_data_numbers[Number(item.id) - 1].to = Number(e.target.value);
                }
            }

        },
        {
            min:0,
            max:20,
            data: FILTER_DATA_STRING_NUMBERS,
            onChangeCheck(e){
                const isChecked = e.target.checked
                //filter_data_numbers[Number(e.target.value) - 1].isChecked = isChecked;
                const value = FILTER_DATA_STRING_NUMBERS[Number(e.target.value) - 1]
                if (isChecked) {
                    setCheckedStringNumbers([...checkedStringNumbers, value])

                } else {
                    const filtered = checkedStringNumbers.filter(item => item.id !== value.id);
                    setCheckedStringNumbers(filtered)
                }
            },
            onChangeFrom(e,item){
                if (Number(e.target.value) > 20 || Number(e.target.value) < 0) {
                    e.target.value = "0"
                } else {
                    const index = checkedStringNumbers.findIndex(itemm => itemm.id === item.id);
                    if (index !== -1) {
                        //alert(JSON.stringify(checkedNumbers[index]))
                        checkedStringNumbers[index].from = Number(e.target.value);
                    }
                    //filter_data_numbers[Number(item.id) - 1].from = Number(e.target.value);
                }
            },
            onChangeTo(e,item){
                if (Number(e.target.value) > 20 || Number(e.target.value) < 0) {
                    e.target.value = "0"
                } else {
                    const index = checkedStringNumbers.findIndex(itemm => itemm.id === item.id);
                    if (index !== -1) {
                        checkedStringNumbers[index].to = Number(e.target.value);
                    }
                    //filter_data_numbers[Number(item.id) - 1].to = Number(e.target.value);
                }
            }

        },
    ]
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
                <FilterComponent
                    onFilterClick = {()=>{
                        const filter_data = {
                            filter_number: JSON.parse(JSON.stringify(checkedNumbers)),
                            filter_bigger_number: JSON.parse(JSON.stringify(checkedStringNumbers)),
                            filter_temperament: JSON.parse(JSON.stringify(checkedTemperament)),
                            filter_country: JSON.parse(JSON.stringify(checkedCountry)),
                            filter_country_codes: JSON.parse(JSON.stringify(checkedCountryCodes))
                        }
                        console.log(JSON.stringify(filter_data))
                        dispatch(updateFilter(filter_data))
                        dispatch(setPage(1))
                    }}
                    onDropClick = {()=>{
                        window.location.reload();
                    }}
                    autocomplete = {autocomplete}
                    min_max_filter = {min_max_filter}
                ></FilterComponent>
            </div>

        </div>
    )


}

export default MainComponent